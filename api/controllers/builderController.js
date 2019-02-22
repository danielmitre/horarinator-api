'use-strict';

const CSV_FILENAME = 'horario.csv';
let fullInstituteScheduler = null;
const DEBUGMODE = true;

let models = require('../models/scheduleModel');


exports.buildSchedule = (function () {
    let maxWishes;
    let successes;
    let sugestions;
    let longest;
    let wishes;

    function backtrack(curr = 0, preenchidos = new Set(), escolhidos = []) {
        if (curr == maxWishes) {
            if (escolhidos.length == maxWishes) {
                successes.push(escolhidos);
            } else if (escolhidos.length == longest) {
                sugestions.push(escolhidos);
            } else if (escolhidos.length > longest) {
                longest = escolhidos.length;
                sugestions = [escolhidos];
            }
        } else {
            for (const [id, turma] of Object.entries(wishes[curr].turmas)) {
                let hasConflict = false;
                
                turma.horarios.map(
                    horario => {hasConflict = hasConflict || preenchidos.has(horario)}
                );

                if (!hasConflict) {
                    let novoPreenchidos = new Set(preenchidos);
                    
                    turma.horarios.map(
                        horario => {novoPreenchidos.add(horario)}
                    );

                    let novoEscolhidos = [...escolhidos];
                    
                    const realDisciplina = fullInstituteScheduler.disciplinas[wishes[curr].nome];

                    novoEscolhidos.push(
                        new models.Disciplina(
                            realDisciplina.nome,
                            realDisciplina.categoria,
                            realDisciplina.periodo,
                            turma
                        )
                    );

                    backtrack(curr + 1, novoPreenchidos, novoEscolhidos);
                }
                backtrack(curr + 1, preenchidos, escolhidos);
            }
        }
    }

    function build(_wishes) {
        wishes = _wishes;
        maxWishes = _wishes.length;
        successes = [];
        sugestions = []
        longest = 0;

        backtrack();

        if (DEBUGMODE) {
            console.log(`${successes.length} perfect matches and ${sugestions.length} sugestions.`);
        }

        return {"success": successes, "sugestions": sugestions};
    }

    return function (body) {
        if (!fullInstituteScheduler) {
            fullInstituteScheduler = require('./extractorController').extractFromFile(CSV_FILENAME);
            if (DEBUGMODE) {
                console.log(fullInstituteScheduler);
                console.log(`${Object.keys(fullInstituteScheduler.disciplinas).length} materias registradas.`);
            }
        }

        let wishes = body.map(obj => new models.Wish(obj, fullInstituteScheduler));

        return build(wishes);
    }
})();