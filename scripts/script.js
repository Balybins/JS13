let money = 70000;
let income = 'Разведение кроликов';
let addExpenses = 'Казино, блекджек, кролики';
let deposit = true;
let mission = 10000000;
let period = 6;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('Length addExpenses: ', addExpenses.length);

console.log('\"Период равен ' + period + ' месяцев\"');
console.log('\"Цель заработать ' + mission + ' рублей/долларов/гривен/юани\"');

let lowerCase = (addExpenses.toLowerCase());
let arr = lowerCase.split(', ');
console.log('arr: ', arr);