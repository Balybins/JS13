'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let min = 1,
    max = 100;

let random = function(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let attempt = 10; 
    console.log('Случайное число: ', randomNumber);

    let userNumber = function() {
        let number = prompt('Угадай число от 1 до 100');
        if (typeof number === 'string'){
            if (isNumber(number)){
                attempt--;
                if (attempt > 0){
                    if (number < randomNumber){
                        alert ('Загаданное число больше, осталось попыток: ' + attempt);
                        userNumber();
                    } else if (number > randomNumber){
                        alert ('Загаданное число меньше, осталось попыток: ' + attempt);
                        userNumber();
                    } else {
                        let result = confirm ('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                        if (result){
                            random(min, max); 
                        }
                        alert ('Игра окончена!');
                    }
                } else {
                    let result = confirm ('Попытки закончились, хотите сыграть еще?');
                        if (result){
                            random(min, max); 
                        }
                        alert ('Игра окончена!');
                }
            } else {
                confirm ('Введи число!');
                userNumber();
            }
        } else {
            alert ('Игра окончена!');
        }
    };
    userNumber();
};
random(min, max);