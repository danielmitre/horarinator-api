'use-strict';

const models = require('../models/scheduleModel');

const fieldIdx = {
    'sala':       0,
    'disciplina': 1,
    'professor':  2,
    'categoria':  3,
    'periodo':    4,
    'horario':    5
};



function buildLineToSchedule(sch) {
    function disciplinaNome(disciplina) {
        return disciplina.slice(0, -3);
    }

    function disciplinaTurma(disciplina) {
        return disciplina.slice(-1);
    }

    return function (line) {
        line = line.split(',');

        //sch.addHorario(disciplina, categoria, periodo, turma, professor, sala, horario) {
        let horario = sch.addHorario(
            disciplinaNome(line[fieldIdx['disciplina']]),
            line[fieldIdx['categoria']],
            line[fieldIdx['periodo']],
            disciplinaTurma(line[fieldIdx['disciplina']]),
            line[fieldIdx['professor']],
            line[fieldIdx['sala']],
            line[fieldIdx['horario']]
        );
    }
}

exports.extractFromFile = function (filename) {
    let lines = require('fs')
                .readFileSync(filename, 'utf8')
                .split('\r\n')
                .slice(1);

    let extractedSchedule = new models.Schedule();

    lines.map(buildLineToSchedule(extractedSchedule));

    return extractedSchedule;
}

