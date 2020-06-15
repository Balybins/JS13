'use strict';
let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    today,
    date = new Date();

// Адаптация под мой массив с днями недели
if (date.getDay() === 0) {
    today = 6;
} else {
    today = date.getDay() - 1;
}

// Функция вывода списка дней недели
let list = function () {
    const ul = document.createElement('ul');
    for (let day of week) {
        const li = document.createElement('li');
        li.textContent = day;
        if (day === 'суббота' || day === 'воскресенье') {
            if (week[today] === 'суббота' || week[today] === 'воскресенье') {
                li.classList.add('weekend', 'today');
            } else {
                li.classList.add('weekend');
            }
        } else if (day === week[today]) {
            li.classList.add('today');
        }
        ul.appendChild(li);
    }
    return ul;
};
document.querySelector('#daysOfWeek').appendChild(list());