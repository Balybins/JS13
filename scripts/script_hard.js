'use strict'

let lang, arrRu, arrEn, namePerson;

arrRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
arrEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

lang = prompt('Введите язык \"ru\" или \"en\"');

if (lang === 'ru') {
    for (let days of arrRu){
        console.log(days);
    }
} else if (lang === 'en') {
    for (let days of arrEn){
        console.log(days);
    }
} else {
    console.log('Вы ввели не верный язык, либо он не поддерживается!');
}