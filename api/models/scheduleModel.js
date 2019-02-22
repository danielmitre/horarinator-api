'use-strict';

class Turma {
    constructor(turma, professor, sala) {
        this.turma = Number(turma);
        this.professor = professor;
        this.sala = sala;
        this.horarios = [];
    }

    addHorario(horario) {
        return this.horarios.push(horario);
    }
};

class Disciplina {
    constructor(nome, categoria, periodo, turmas = undefined) {
        this.nome = nome;
        this.categoria = categoria;
        this.periodo = periodo;
        this.turmas = turmas || {};
    }

    addTurma(turma, professor, sala) {
        turma = Number(turma);
        if (!this.turmas[turma]) {
            this.turmas[Number(turma)] = new Turma(turma, professor, sala);
        }
        return this.turmas[turma]
    }

    addHorario(turma, professor, sala, horario) {
        return this.addTurma(turma, professor, sala)
            .addHorario(horario);
    }
};

class Schedule {
    constructor() {
        this.disciplinas = {};
    }

    addDisciplina(disciplina, categoria, periodo) {
        if (!this.disciplinas[disciplina]) {
            this.disciplinas[disciplina] = new Disciplina(disciplina, categoria, periodo);
        }
        return this.disciplinas[disciplina];
    }

    addTurma(disciplina, categoria, periodo, turma, professor, sala) {
        return this.addDisciplina(disciplina, categoria, periodo)
            .addTurma(turma, professor, sala);
    }

    addHorario(disciplina, categoria, periodo, turma, professor, sala, horario) {
        return this.addTurma(disciplina, categoria, periodo, turma, professor, sala)
            .addHorario(horario);
    }
};

class Wish {
    constructor(obj, globalSchedule) {
        this.nome   = obj.nome;
        if (obj.turmas) {
            this.turmas = obj.turmas.map((turma) => globalSchedule.disciplinas[this.nome].turmas[turma]);
        } else {
            this.turmas = globalSchedule.disciplinas[this.nome].turmas;
        }
    }
};

module.exports = {
    'Disciplina': Disciplina,
    'Turma': Turma,
    'Schedule': Schedule,
    'Wish': Wish
};