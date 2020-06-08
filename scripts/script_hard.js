'use strict'

let lang, ru, en, newArr, newArr2, newArr3, namePerson;

// Одномерные массивы для if...else и switch
ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Многомерный массив в виде объекта
newArr = {'ru' : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
'en' : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']};

// Многомерный массив для тернарных операторов
newArr2 = [['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];

// Многомерный массив для indexOf 
newArr3 = [['ru', 'en'], 
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];

lang = (prompt('Введите язык \"ru\" или \"en\"')).toLowerCase();

// Вывод дней недели из одномерных массивов при помощи if...else
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

// Вывод дней недели из одномерных массивов при помощи switch
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

// Вывод дней недели из многомерного массива при помощи indexOf
console.warn('Дни недели из многомерного массива:');
let indexDays = newArr3[0].indexOf(lang)+1;
for (let days of newArr3[indexDays]){
    console.log(days);
}

// Вывод дней недели из многомерного массива при помощи тернарных операторов
console.warn('Дни недели через тернарные операторы:');
let arrLang = lang === 'ru' ? 0 : 1;
for (let days of newArr2[arrLang]){
    console.log(days);
}

// Вывод дней недели из объекта при помощи
let result = newArr[lang];
if (result){
    console.warn('Дни недели из объекта:');
    for (let days of result){
        console.log(days);
    }
}

//Использование множества тернарных операторов 
namePerson = prompt('Введите имя');

console.warn('Вывод должности по имени:');
let person = (namePerson === 'Артем') ? 'директор' : (namePerson === 'Максим') ? 'преподаватель' : 'студент';
console.log(namePerson, ': ', person);