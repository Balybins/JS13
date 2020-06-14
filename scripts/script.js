'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let random = function(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('Случайное число: ', randomNumber);

    let userNumber = function() {
        let number = prompt('Угадай число от 1 до 100');
        if (typeof number === 'string'){
            if (isNumber(number)){
                if (number < randomNumber){
                    alert ('Загаданное число больше');
                    userNumber();
                } else if (number > randomNumber){
                    alert ('Загаданное число меньше');
                    userNumber();
                } else {
                    alert ('Вы угадали число!');
                }
            } else {
                confirm ('Введи число!');
                userNumber();
            }
        } else {
            alert ('Игра окончена!');
        }
    };
    // console.dir(userNumber);
    userNumber();
};
random(1, 100);