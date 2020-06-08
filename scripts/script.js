'use strict';

let money, income, addExpenses, deposit, mission, period, expenses1, expenses2, amount1, amount2,
    budgetDay, budgetMonth, finishMission;

money = 70000;
income = 'Разведение кроликов';
addExpenses = 'Казино, блекджек, кролики';
deposit = true;
mission = 10000000;
period = 6;

money = +prompt('Ваш месячный доход');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('И ещё одна обязательная статью расходов');
amount2 = +prompt('Во сколько это обойдется?');

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('Length addExpenses: ', addExpenses.length);

console.log('\"Период равен ' + period + ' месяцев\"');
console.log('\"Цель заработать ' + mission + ' рублей/долларов/гривен/юани\"');

let lowerCase = (addExpenses.toLowerCase());
let arr = lowerCase.split(', ');
console.log('arr: ', arr);

budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

finishMission = Math.ceil((mission / budgetMonth) / 30);
console.log('Цель будет достигнута за: ', finishMission, ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

switch (true) {
    case budgetDay >= 1200:
        console.log('У вас высокий уровень дохода!');
        break;
    case budgetDay < 1200 && budgetDay >= 600:
        console.log('У вас средний уровень дохода.');
        break;
    case budgetDay < 600 && budgetDay >= 0:
        console.log('К сожалению у вас уровень дохода ниже среднего :(');
        break;
    case budgetDay < 0:
        console.log('Что то пошло не так O_o');
        break;
}