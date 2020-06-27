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


const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.checkSalaryAmount = function () {
    if (isNumber(salaryAmount.value)) {
        start.disabled = false;
        start.style.cursor = '';
    } else {
        start.disabled = true;
        start.style.cursor = 'default';
    }
};

AppData.prototype.start = function () {
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
};

AppData.prototype.reset = function () {
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
};

AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
        incomePeriodValue.value = _this.calcPeriod();
    });
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    }, this);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};

AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function (budgetDay) {
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

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        let percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
        while (!isNumber(percentDeposit)) {
            percentDeposit = (prompt('Какой годовой процент?', 10)).trim();
        }
        this.percentDeposit = +percentDeposit;

        let moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
        while (!isNumber(moneyDeposit)) {
            moneyDeposit = (prompt('Какая сумма заложена?', 10000)).trim();
        }
        this.moneyDeposit = +moneyDeposit;
    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriod = function () {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.blockedInputs = function () {
    leftSideInputs.querySelectorAll('input[type="text"]').forEach(function (item) {
        item.disabled = true;
    });
};

AppData.prototype.eventListeners = function () {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('input', this.checkSalaryAmount);
    periodSelect.addEventListener('input', this.changePeriod.bind(this));  
    start.disabled = true;
    start.style.cursor = 'default';

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
};

const appData = new AppData();
appData.eventListeners();