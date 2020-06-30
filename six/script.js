'use strict';

let dateNow = new Date(),
    hello = document.getElementById('hello'),
    dayOfWeek = document.getElementById('day-of-week'),
    timeNow = document.getElementById('time-now'),
    timeToNewYear = document.getElementById('time-to-new-year'),
    daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dateNY = new Date('01 01 ' + (dateNow.getFullYear() + 1)).getTime(),
    timeRemaining = (dateNY - dateNow.getTime()) / 1000,
    seconds = Math.floor(timeRemaining % 60),
    minutes = Math.floor((timeRemaining / 60) % 60),
    hours = Math.floor((timeRemaining / 60 / 60)) % 24,
    days = Math.floor(timeRemaining / 60 / 60 / 24),
    strDay = '';

if (dateNow.getHours() >= 5 && dateNow.getHours() <= 11) {
    hello.textContent = `Доброе утро!`;
} else if (dateNow.getHours() >= 12 && dateNow.getHours() <= 16) {
    hello.textContent = `Добрый день!`;
} else if (dateNow.getHours() >= 17 && dateNow.getHours() <= 23) {
    hello.textContent = `Добрый вечер!`;
} else if (dateNow.getHours() >= 0 && dateNow.getHours() <= 4) {
    hello.textContent = `Доброй ночи!`;
}

dayOfWeek.textContent = `Сегодня: ${daysOfWeek[dateNow.getDay()]}`;
timeNow.textContent = `Текущее время: ${dateNow.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
})}`;

if (days % 10 === 1 && days % 100 !== 11) {
    strDay = 'день';
} else if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) {
    strDay = 'дня';
} else {
    strDay = 'дней';
}
timeToNewYear.textContent = `До нового года осталось: ${days} ${strDay}`;