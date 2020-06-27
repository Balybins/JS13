'use strict';

// Функции проверки данных
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
const isText = (t) => isNaN(parseFloat(t)) && t !== '' && t !== null;

const start = document.getElementById('start'),
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
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeAmount = document.querySelector('.income-amount'),
    inputAmounts = document.querySelectorAll('input[placeholder="Сумма"]'),
    inputTitles = document.querySelectorAll('input[placeholder="Наименование"]'),
    leftSideInputs = document.querySelector('.data'),
    rightSideInputs = document.querySelector('.result');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor() {
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
    }
    
    checkSalaryAmount() {
        if (isNumber(salaryAmount.value)) {
            start.disabled = false;
            start.style.cursor = '';
        } else {
            start.disabled = true;
            start.style.cursor = 'default';
        }
    }

    start() {
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
    }

    reset() {
        start.style.display = 'block';
        cancel.style.display = 'none';
        leftSideInputs.querySelectorAll('input[type="text"]').forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        rightSideInputs.querySelectorAll('input[type="text"]').forEach((item) => {
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
    }
    
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }
    
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    
    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    }
    
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    
    getStatusIncome(budgetDay) {
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
    
    getInfoDeposit() {
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
    }
    
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    
    changePeriod() {
        periodAmount.textContent = periodSelect.value;
    }
    
    blockedInputs() {
        leftSideInputs.querySelectorAll('input[type="text"]').forEach((item) => {
            item.disabled = true;
        });
    }
    
    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('input', this.checkSalaryAmount);
        periodSelect.addEventListener('input', this.changePeriod.bind(this));  
        start.disabled = true;
        start.style.cursor = 'default';
    
        inputAmounts.forEach((item) => {
            item.addEventListener('input', () => {
                const notNumbers = /\D/;
                item.value = item.value.replace(notNumbers, '');
            });
        });
        
        inputTitles.forEach((item) => {
            item.addEventListener('input', () => {
                const someWords = /[^А-ЯЁ,.!? ]/i;
                item.value = item.value.replace(someWords, '');
            });
        });
    }
}

const appData = new AppData();
appData.eventListeners();