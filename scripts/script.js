'use strict';

// Функция проверки данных, что это число
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    // Функция получения данных о месячном доходе, с проверкой на то что введеные данные - число!
    start = function () {
        do {
            money = prompt('Ваш месячный доход');
        }
        while (!isNumber(money));
    };
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 10000000,
    period: 6,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let newExpenses = prompt('Введите обязательную статью расходов ' + (i + 1), 'Обязательная статья ' + (i + 1));
            let amount = +prompt('Во сколько это обойдется?');
            while (!isNumber(amount)) {
                amount = prompt('Во сколько это обойдется?');
            }
            appData.expenses[newExpenses] = amount;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function (budgetDay) {
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
};

appData.asking();

// Вызов функции расчета обязательных расходов на месяц
console.log('Обязательные расходы за месяц: ', appData.getExpensesMonth());

// Вызов функции расчета бюджета на день и на месяц
appData.getBudget();

// Вызов функции расчета срока для достижения цели
let target = appData.getTargetMonth() < 0 ? 'Цель не будет достигнута!' :
    'Цель будет достигнута через: ' + appData.getTargetMonth() + ' мес';
console.log(target);

// Вызов функции вывода уровня дохода
console.log(appData.getStatusIncome(appData.budgetDay));

let allInfo = function () {
    console.log('Наша программа включает в себя данные: ');
    for (let key in appData) {
        console.log(key, ': ', appData[key]);
    }
};
allInfo();