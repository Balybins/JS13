'use strict';

let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    today,
    date = new Date();

    if (date.getDay() === 0) {
        today = 6;
    } else {
        today = date.getDay() - 1;
    }

let list = function() {
    for (let day of week){
        if (day === 'суббота' || day === 'воскресенье') {
            if (week[today] === 'суббота' || week[today] === 'воскресенье'){
                console.log('%c' + day, 'font-style: italic; font-weight: bold');
            } else {
                console.log('%c' + day, 'font-style: italic');
            }
        } else if (day === week[today]){
            console.log('%c' + day, 'font-weight: bold');
        } else {
            console.log(day);
        }
    }
};
list();