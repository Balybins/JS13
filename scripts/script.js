'use strict';

const buttonCalculate = document.getElementById('start'),
    // buttonPlus0 = document.querySelectorAll('button')[0],
    // buttonPlus1 = document.querySelectorAll('button')[1],
    buttonPlus0 = document.getElementsByTagName('button')[0],
    buttonPlus1 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    inputAddIncome0 = document.querySelectorAll('.additional_income-item')[0],
    inputAddIncome1 = document.querySelectorAll('.additional_income-item')[1],
    inputValue0 = document.getElementsByClassName('budget_month-value')[0],
    inputValue1 = document.getElementsByClassName('budget_day-value')[0],
    inputValue2 = document.getElementsByClassName('expenses_month-value')[0],
    inputValue3 = document.getElementsByClassName('additional_income-value')[0],
    inputValue4 = document.getElementsByClassName('additional_expenses-value')[0],
    inputValue5 = document.getElementsByClassName('income_period-value')[0],
    inputValue6 = document.getElementsByClassName('target_month-value')[0],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelectorAll('.income-title')[1],
    inputIncomeAmount = document.querySelector('.income-amount'),
    inputExpensesTitle = document.querySelectorAll('.expenses-title')[1],
    inputExpensesAmount = document.querySelector('.expenses-amount'),
    inputAddExpenses = document.querySelector('.additional_expenses-item'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select');


// rightSide = document.body.querySelectorAll('[class$="-value"]');
// for (let elem of rightSide) {
//     console.log(elem);
// }

console.log(buttonCalculate, buttonPlus0, buttonPlus1, checkBox, inputAddIncome0, inputAddIncome1, inputValue0, inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputSalaryAmount, inputIncomeTitle, inputIncomeAmount, inputExpensesTitle, inputExpensesAmount, inputAddExpenses, inputTargetAmount, inputPeriodSelect);