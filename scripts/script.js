'use strict';

let fly = document.getElementById('fly'),
    count = 0,
    flyInterval;

let flyAnimate = () => {
    flyInterval = requestAnimationFrame(flyAnimate);
    count++;
    if (count < 350) {
        fly.style.left = count * 2 + 'px';
        fly.style.top = count + 'px';
    } else if (count < 500) {
        fly.style.left = count * 2 + 'px';
    } else {
        cancelAnimationFrame(flyInterval);
    }
    console.log(count);
};
flyInterval = requestAnimationFrame(flyAnimate);