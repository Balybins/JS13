'use strict';

// Функции проверки данных
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function (t) {
    return isNaN(parseFloat(t)) && t !== '' && t !== null;
};

const start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome0 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncome1 = document.querySelectorAll('.additional_income-item')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');



let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 10000000,
    period: 6,
    start: function () {
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);

        // appData.asking();
        // appData.getExpensesMonth();
        // appData.getBudget();
        // appData.getInfoDeposit();
    },
    asking: function () {

        if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
            let itemIncome = (prompt('Ваш дополнительный заработок?', 'Вышивание')).trim();
            while (!isText(itemIncome)) {
                itemIncome = (prompt('Ваш дополнительный заработок?', 'Вышивание')).trim();
            }
            let cashIncome = (prompt('Сколько в месяц Вы на этом зарабатываете?', 10000)).trim();
            while (!isNumber(cashIncome)) {
                cashIncome = (prompt('Сколько в месяц Вы на этом зарабатываете?', 10000)).trim();
            }
            appData.income[itemIncome] = +cashIncome;
        }

        let addExpenses = (prompt('Перечислите возможные расходы за рассчитываемый период через запятую')).trim();
        while (!isText(addExpenses)) {
            addExpenses = (prompt('Перечислите возможные расходы за рассчитываемый период через запятую')).trim();
        }
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let newExpenses = (prompt('Введите обязательную статью расходов ' + (i + 1), 'Обязательная статья ' + (i + 1))).trim();
            while (!isText(newExpenses)) {
                newExpenses = (prompt('Введите обязательную статью расходов ' + (i + 1), 'Обязательная статья ' + (i + 1))).trim();
            }

            let amount = (prompt('Во сколько это обойдется?')).trim(); // Если приводить полученную строку к number здесь, то пробелы принимает как 0
            while (!isNumber(amount)) {
                amount = (prompt('Во сколько это обойдется?')).trim(); // Если приводить полученную строку к number здесь, то пробелы принимает как 0
            }
            appData.expenses[newExpenses] = +amount; // Поэтому привожу строку к number, после всех проверок 
        }
    },
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
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
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            let percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
            while (!isNumber(percentDeposit)) {
                percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
            }
            appData.percentDeposit = +percentDeposit;

            let moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
            while (!isNumber(moneyDeposit)) {
                moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
            }
            appData.moneyDeposit = +moneyDeposit;
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

start.addEventListener('click', appData.start);