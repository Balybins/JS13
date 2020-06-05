let num = 266219;
let result = 1;
num = String(num);

for (let i = 0; i < num.length; i++) {
    result = result * num[i];
}

console.log('result: ', result);

result = result ** 3;