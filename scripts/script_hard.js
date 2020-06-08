'use strict'

let lang, ru, en, newArr, newArr2, namePerson;

ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

lang = (prompt('Введите язык \"ru\" или \"en\"')).toLowerCase();

console.log('if...else:');
if (lang === 'ru') {
    for (let days of ru){
        console.log(days);
    }
} else if (lang === 'en') {
    for (let days of en){
        console.log(days);
    }
} else {
    console.log('Вы ввели не верный язык, либо он не поддерживается!');
}

console.log('switch:');
switch (lang){
    case 'ru':
        for (let days of ru){
            console.log(days);
        }
        break;
    case 'en':
        for (let days of en){
            console.log(days);
        }
        break;
    default:
        console.log('Вы ввели не верный язык, либо он не поддерживается!');
}