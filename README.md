# horarinator-api
API RESTful para criar horarios com base no formato do [.csv](horario.csv) fornecido por Computacao@UFCG para a matrícula.

## Executar localmente

Basta clonar o repositório e iniciar o servidor

```
git clone https://github.com/danielmitre/horarinator-api.git
cd horarinator-api/
npm run start
```

## Rotas

### [POST] /schedule/create

No [documento oficial de Computação@UFCG](https://bit.ly/horario2019-1) as turmas são exibidas com um padrão ```{disciplina}-t{turma}``` (em **fmcc2-t1**, por exemplo, corresponde à turma **1** da disciplina **fmcc2**). 

#### Request:
Essa rota espera um array de objetos com os atributos **nome** e **turmas**, onde **nome** corresponde à ```{disciplina}``` e **turmas** é um array com os valores de ```{turma}``` das matérias desejadas.
 
Exemplo:
 ```
[{
    "nome": "bd1",
    "turmas": [1, 3]
}, {
    "nome": "estatistica-aplicada"
}, {
    "nome": "es"
}]
```

> **Dica:** os horários são montados utilizando a ordem das disciplinas e turmas como foram enviadas. Ou seja: caso retorne vários horários possíveis, os primeiros posssuirão mais matérias do começo do *request* do que os seguintes.

#### Resposta:

A resposta retorna um json com os campos **sucess** e **sugestions**, Ambos são arrays de horários válidos, sendo os horários representados como arrays de disciplinas com os campos **nome**, **categoria**, **periodo** e **turmas** (apesar do nome, terá apenas uma turma em cada disciplina do horário).

Exemplo:
```
{"success": [[{
    "nome": "bd1",
    "categoria": "obrigatoria",
    "periodo": "5;4",
    "turmas": {
        "turma": 1,
        "professor": "claudio",
        "sala": "re-08",
        "horarios": [
            "i16",
            "t14"
        ]
    }
}, {
    "nome": "estatistica-aplicada",
    "categoria": "obrigatoria",
    "periodo": "4;5",
    "turmas": {
        "turma": 1,
        "professor": "?",
        "sala": "pre",
        "horarios": [
            "i08",
            "s10"
        ]
    }
}, {
    "nome": "es",
    "categoria": "obrigatoria",
    "periodo": "4;5",
    "turmas": {
        "turma": 1,
        "professor": "rohit",
        "sala": "caa406",
        "horarios": [
            "q16",
            "s14"
        ]
    }
}]],
"sugestions": [[{
    "nome": "bd1",
    "categoria": "obrigatoria",
    "periodo": "5;4",
    "turmas": {
        "turma": 1,
        "professor": "claudio",
        "sala": "re-08",
        "horarios": [
            "i16",
            "t14"
        ]
    }
},
{
    "nome": "estatistica-aplicada",
    "categoria": "obrigatoria",
    "periodo": "4;5",
    "turmas": {
        "turma": 1,
        "professor": "?",
        "sala": "pre",
        "horarios": [
            "i08",
            "s10"
        ]
    }
}], [
    ...
]]}
```

> **Dica:** a primeira letra de cada horário representa um dia da semana da seguinte forma:
> * **s**: segunda-feira
> * **t**: terça-feira
> * **q**: quarta-feira
> * **i**: quinta-feira
> * **x**: sexta-feira
> ` `  
> &nbsp;


