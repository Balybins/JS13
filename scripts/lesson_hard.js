'use strict';

let arr = [],
    haveNumber = null;

for (let i = 0; i < 2; i++){
    let number = prompt('Введите многозначное число');
    while (number.length < 2) {
        number = prompt('Введите многозначное число');
    }
    arr[i] = number;
}

console.warn('Первое задание:');
for (let numbers of arr){
    if (numbers.slice(0, 1) === '2' || numbers.slice(0, 1) === '4'){
        console.log(numbers);
        haveNumber = 1;
    }
}
if (haveNumber !== 1) {
    console.log('Чисел начинающихся на 2 или 4 - нет в массиве');
}