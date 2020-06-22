'use strict';

// Функции проверки данных
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function (t) {
    return isNaN(parseFloat(t)) && t !== '' && t !== null;
};

let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
    incomeItem = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeAmount = document.querySelector('.income-amount'),
    inputAmounts = document.querySelectorAll('input[placeholder="Сумма"]'),
    inputTitles = document.querySelectorAll('input[placeholder="Наименование"]');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    checkSalaryAmount: function () {
        if(isNumber(salaryAmount.value)){
            start.disabled = false;
            start.style.cursor = '';
        } else {
            start.disabled = true;
            start.style.cursor = 'default';
        }
    },

    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },

    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },

    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key]; 
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },

    changePeriod: function () {
        periodAmount.textContent = periodSelect.value;
    }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
start.disabled = true;
start.style.cursor = 'default';
salaryAmount.addEventListener('input', appData.checkSalaryAmount);
periodSelect.addEventListener('input', appData.changePeriod);

inputAmounts.forEach(function (item) {
    item.addEventListener('input', function () {
        let notNumbers = /\D/;
        item.value = item.value.replace(notNumbers, '');
    });
});

inputTitles.forEach(function (item) {
    item.addEventListener('input', function () {
        let someWords = /[^\s\WА-ЯЁ]/i;
        item.value = item.value.replace(someWords, '');
    });
});