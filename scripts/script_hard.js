'use strict'

let lang, ru, en, newArr, newArr2, newArr3, namePerson;

ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

newArr = {'ru' : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
'en' : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']};

newArr2 = [['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];

newArr3 = [['ru', 'en'], 
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];

lang = (prompt('Введите язык \"ru\" или \"en\"')).toLowerCase();

console.warn('if...else:');
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

console.warn('switch:');
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

console.warn('Дни недели из многомерного массива:');
let indexDays = newArr3[0].indexOf(lang)+1;
for (let days of newArr3[indexDays]){
    console.log(days);
}

console.warn('Дни недели через тернарные операторы:');
let arrLang = lang === 'ru' ? 0 : 1;
for (let days of newArr2[arrLang]){
    console.log(days);
}

console.warn('Дни недели из объекта:');
let result = newArr[lang];
for (let days of result){
    console.log(days);
}