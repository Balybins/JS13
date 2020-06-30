'use strict';

let fly = document.getElementById('fly'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    reset = document.getElementById('reset'),
    count = 0,
    flyInterval;

let flyAnimate = () => {
    flyInterval = requestAnimationFrame(flyAnimate);
    count++;
    if (count < 320) {
        fly.style.left = count * 2 + 'px';
        fly.style.top = count + 'px';
    } else if (count < 590) {
        fly.style.left = count * 2 + 'px';
    } else {
        cancelAnimationFrame(flyInterval);
    }
};

start.addEventListener('click', () => {
    flyInterval = requestAnimationFrame(flyAnimate);
    stop.style.display = 'block';
    start.style.display = 'none';
});

stop.addEventListener('click', () => {
    cancelAnimationFrame(flyInterval);
    stop.style.display = 'none';
    start.style.display = 'block';
});

reset.addEventListener('click', () => {
    cancelAnimationFrame(flyInterval);
    stop.style.display = 'none';
    start.style.display = 'block';
    fly.style.left = 0 + 'px';
    fly.style.top = 0 + 'px';
    count = 0;
});