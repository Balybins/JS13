'use strict'

let lang, arrRu, arrEn, namePerson;

arrRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
arrEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

lang = prompt('Введите язык \"ru\" или \"en\"');

if (lang === 'ru') {
    for (let i = 0; i < 7; i++) {
        console.log(arrRu[i]);
    }
} else if (lang === 'en') {
    for (let i = 0; i < 7; i++) {
        console.log(arrEn[i]);
    }
} else {
    console.log('Вы ввели не верный язык, либо он не поддерживается!');
}