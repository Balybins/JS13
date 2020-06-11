'use strict';

let arr = [],
    haveNumber = null;

for (let i = 0; i < 8; i++){
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

console.warn('Второе задание:');
nextStep:
for (let i = 2; i <= 100; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0){
        continue nextStep;
    } 
  }
  if (i === 73){
    console.log('Число:', i + '. Делители этого числа - 1 и ' + i + ' и это любимое число Шелдона Купера!');
  } else {
    console.log('Число:', i + '. Делители этого числа - 1 и ' + i);
  }
}