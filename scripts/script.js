'use strict';

// Проверяем введенное число, что это число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Переменные для определения диапазона случайного числа
let min = 1,
    max = 100;

// Функция игры "Угадай случайное число"
let random = function(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Генерируем случайное число
    let attempt = 10; // Устанавливаем количество попыток
    console.log('Случайное число: ', randomNumber);

    // Функция проверки введенного пользователем числа с загаданным числом
    let userNumber = function() {
        let number = prompt('Угадай число от 1 до 100');
        if (typeof number === 'string'){ // Если пользователь ввел данные в поле, то отправляем данную строку в функцию проверки числа 
            if (isNumber(number)){ // Если это число, то запускаем проверку на сравнение чисел
                attempt--; // Уменьшаем количество попыток
                if (attempt > 0){ // Если попытки ещё есть, то
                    if (number < randomNumber){
                        alert ('Загаданное число больше, осталось попыток: ' + attempt);
                        userNumber();
                    } else if (number > randomNumber){
                        alert ('Загаданное число меньше, осталось попыток: ' + attempt);
                        userNumber();
                    } else { // Иначе сообщаем, что победили и предлагаем сыграть еще
                        let result = confirm ('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                        if (result){ // Перезапускаем игру
                            random(min, max); 
                        }
                        alert ('Игра окончена!');
                    }
                } else { // Иначе сообщаем, что попытки закончились и предлагаем сыграть еще
                    let result = confirm ('Попытки закончились, хотите сыграть еще?');
                        if (result){ // Перезапускаем игру
                            random(min, max); 
                        }
                        alert ('Игра окончена!');
                }
            } else { // Иначе выводим сообщение, что необходимо ввести число и перезапускаем функцию
                confirm ('Введи число!');
                userNumber();
            }
        } else { // Если пользователь нажал "Отмена" или ESC, то завершаем игру
            alert ('Игра окончена!');
        }
    };
    userNumber();
};
random(min, max);