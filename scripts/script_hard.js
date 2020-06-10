'use strict';

let data = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga blanditiis eius earum autem similique modi, totam magni ab ipsum nisi. Quam voluptatum magnam explicabo delectus facilis laborum voluptate dolor culpa? ';
// let data = 12345;

// Обычная функция
let someFunction = function (data){
    if (typeof data !== 'string'){
        return 'Это не строка! Введите корректные данные!';
    } else {
        data = data.trim();
        if (data.length > 30){
            return data.slice(0, 30) + '...';
        } 
        return data;
    }
}
console.log(someFunction(data));

// Callbeck функция
let someFunction2 = function (data, callbeck){
    if (typeof data !== 'string'){
        console.log('Это не строка! Введите корректные данные!');
    } else {
        callbeck(data);
    }
}

function stringData(data){
    let changeData = data.trim();
        if (changeData.length > 30){
            let resultData = changeData.slice(0, 30) + '...';
            console.log(resultData);
        } else {
            console.log(changeData);
        }
}
someFunction2(data, stringData);