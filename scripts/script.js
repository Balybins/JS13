'use strict';

// Функции проверки данных
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function (t) {
    return isNaN(parseFloat(t)) && t !== '' && t !== null;
};

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    inputTitles = document.querySelectorAll('input[placeholder="Наименование"]'),
    leftSideInputs = document.querySelector('.data'),
    rightSideInputs = document.querySelector('.result');

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
        if (isNumber(salaryAmount.value)) {
            start.disabled = false;
            start.style.cursor = '';
        } else {
            start.disabled = true;
            start.style.cursor = 'default';
        }
    },

    start: function () {
        console.log('start: ', this);
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.blockedInputs();
        this.showResult();
    },

    reset: function () {
        start.style.display = 'block';
        cancel.style.display = 'none';
        leftSideInputs.querySelectorAll('input[type="text"]').forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });
        rightSideInputs.querySelectorAll('input[type="text"]').forEach(function (item) {
            item.value = '';
        });
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[i].remove();
            incomePlus.style.display = '';
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[i].remove();
            expensesPlus.style.display = '';
        }
        periodSelect.value = periodAmount.textContent = 1;
        depositCheck.checked = false;
        start.disabled = true;
        start.style.cursor = 'default';
        this.budget = this.budgetDay = this.budgetMonth = this.expensesMonth = this.incomeMonth = this.percentDeposit = this.moneyDeposit = 0;
        this.income = this.expenses = {};
        this.addIncome = this.addExpenses = [];
        this.deposit = false;
    },

    showResult: function () {
        console.log('showResult: ', this);

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        // Вот тут ломал голову, как можно вызвать функцию с использованием this,
        // в итоге пошел на хитрость и вынес её вызов за объект appData.
        // Так можно или всё таки нужно как-то прям здесь обратиться?

        // periodSelect.addEventListener('input', function () {
        //     incomePeriodValue.value = appData.calcPeriod();
        // });
    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function () {
        console.log('getExpenses: ', this);

        expensesItems.forEach(function (item) {
            console.log('IN getExpenses: ', this);
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    getIncome: function () {
        console.log('getIncome: ', this);

        incomeItems.forEach(function (item) {
            console.log('IN getIncome: ', this);
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        }, this);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getAddExpenses: function () {
        console.log('getAddExpenses: ', this);

        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            console.log('IN getAddExpenses: ', this);

            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },

    getAddIncome: function () {
        console.log('getAddIncome: ', this);

        additionalIncomeItem.forEach(function (item) {
            console.log('IN getAddIncome: ', this);

            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },

    getExpensesMonth: function () {
        console.log('getExpensesMonth: ', this);

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    },

    getBudget: function () {
        console.log('getBudget: ', this);

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function () {
        console.log('getTargetMonth: ', this);

        return targetAmount.value / this.budgetMonth;
    },

    // getStatusIncome: function (budgetDay) {
    //     switch (true) {
    //         case budgetDay >= 1200:
    //             return ('У вас высокий уровень дохода!');
    //         case budgetDay < 1200 && budgetDay >= 600:
    //             return ('У вас средний уровень дохода.');
    //         case budgetDay < 600 && budgetDay >= 0:
    //             return ('К сожалению у вас уровень дохода ниже среднего :(');
    //         case budgetDay < 0:
    //             return ('Что то пошло не так O_o');
    //     }
    // },

    // getInfoDeposit: function () {
    //     if (appData.deposit) {
    //         let percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
    //         while (!isNumber(percentDeposit)) {
    //             percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
    //         }
    //         appData.percentDeposit = +percentDeposit;

    //         let moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
    //         while (!isNumber(moneyDeposit)) {
    //             moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
    //         }
    //         appData.moneyDeposit = +moneyDeposit;
    //     }
    // },

    calcPeriod: function () {
        console.log('calcPeriod: ', this);

        return this.budgetMonth * periodSelect.value;
    },

    changePeriod: function () {
        console.log('changePeriod: ', this);

        periodAmount.textContent = periodSelect.value;
    },

    blockedInputs: function () {
        leftSideInputs.querySelectorAll('input[type="text"]').forEach(function (item) {
            item.disabled = true;
        });
    }
};

start.addEventListener('click', function () {
    appData.start();
});

cancel.addEventListener('click', function () {
    appData.reset();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
start.disabled = true;
start.style.cursor = 'default';
salaryAmount.addEventListener('input', appData.checkSalaryAmount);
periodSelect.addEventListener('input', function () {
    appData.changePeriod();
    incomePeriodValue.value = appData.calcPeriod();
});

inputAmounts.forEach(function (item) {
    item.addEventListener('input', function () {
        let notNumbers = /\D/;
        item.value = item.value.replace(notNumbers, '');
    });
});

inputTitles.forEach(function (item) {
    item.addEventListener('input', function () {
        let someWords = /[^А-ЯЁ,.!? ]/i;
        item.value = item.value.replace(someWords, '');
    });
});