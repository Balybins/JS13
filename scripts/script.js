'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Разведение кроликов',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, ЖКХ, Интернет'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 10000000,
    expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход');
    }
    while (!isNumber(money));
};
start();

// Функция вывода типа данных
let showTypeOf = function (data) {
    return typeof data;
};
console.log('money: ', showTypeOf(money)); // Вызываем функцию и передаем в неё параметры
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));

// Функция расчета обязательных расходов на месяц
let getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов ' + (i+1), 'Обязательная статья');
        let amount = prompt('Во сколько это обойдется?');
        while (!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
        }
        sum += +amount;
    }
    return sum;
};
let expensesAmount = getExpensesMonth();
console.log('Обязательные расходы за месяц: ', expensesAmount);

// Функция расчета накоплений за месяц
let getAccumulatedMonth = function (){
    return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));

// Функция расчета срока для достижения цели
let getTargetMonth = function (){
    if (Math.ceil(mission / accumulatedMonth) < 0) {
        console.log('Цель не будет достигнута!');
    } else {
        console.log('Цель будет достигнута через: ', Math.ceil(mission / accumulatedMonth), ' мес');
    } 
};
getTargetMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

// Функция вывода уровня дохода
let getStatusIncome = function(budgetDay){
    switch (true) {
        case budgetDay >= 1200:
            return ('У вас высокий уровень дохода!');
        case budgetDay < 1200 && budgetDay >= 600:
            return ('У вас средний уровень дохода.');
        case budgetDay < 600 && budgetDay >= 0:
            return ('К сожалению у вас уровень дохода ниже среднего :(');
        case budgetDay < 0:
            return ('Что то пошло не так O_o');
    }
};
console.log(getStatusIncome(budgetDay));