'use strict';

let money = +prompt('Ваш месячный доход', 70000),
    income = 'Разведение кроликов',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, ЖКХ, Интернет'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 10000000,
    expenses1 = prompt('Введите обязательную статью расходов', 'Еда'),
    amount1 = +prompt('Во сколько это обойдется?', 15000),
    expenses2 = prompt('И ещё одна обязательная статью расходов', 'ЖКХ'),
    amount2 = +prompt('Во сколько это обойдется?', 12000);

// Функция вывода типа данных
let showTypeOf = function (data){
    return typeof data;
}
console.log('money: ', showTypeOf(money)); // Вызываем функцию и передаем в неё параметры
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));

// Функция расчета обязательных расходов на месяц
let getExpensesMonth = function(){
    return amount1 + amount2;
}
console.log('Обязательные расходы за месяц: ', getExpensesMonth());

// Функция расчета накоплений за месяц
let getAccumulatedMonth = function (){
    return money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();

console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));

// Функция расчета срока для достижения цели
let getTargetMonth = function (){
    return Math.ceil(mission / accumulatedMonth);
}
console.log('Цель будет достигнута через: ', getTargetMonth(), ' мес');

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
}
console.log(getStatusIncome(budgetDay));