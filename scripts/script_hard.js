'use strict';

let someFunction = function (data){
    if (typeof data !== 'string'){
        return 'Это не строка! Введите корректные данные!';
    } else {
        let changeData = data.trim();
        if (changeData.length > 30){
            let resultData = changeData.slice(0, 30) + '...';
            return resultData;
        } else {
            return changeData;
        }
        
    }
}
console.log(someFunction(' Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga blanditiis eius earum autem similique modi, totam magni ab ipsum nisi. Quam voluptatum magnam explicabo delectus facilis laborum voluptate dolor culpa? '));