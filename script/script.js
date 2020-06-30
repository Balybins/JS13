window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // let count = 0;
    // let count2 = 0;

    function countTimer(deadline) {
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60),
                days = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }


        function updateClock() {
            let timer = getTimeRemaining();

            if (String(timer.hours).length === 1) {
                timerHours.textContent = `0${timer.hours}`;
            } else {
                timerHours.textContent = timer.hours;
            }
            if (String(timer.minutes).length === 1) {
                timerMinutes.textContent = `0${timer.minutes}`;
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            if (String(timer.seconds).length === 1) {
                timerSeconds.textContent = `0${timer.seconds}`;
            } else {
                timerSeconds.textContent = timer.seconds;
            }


            if (timer.timeRemaining > 0) {
                // count++;
                // console.log(`count ${count}`);
                let idSetInterval = setInterval(updateClock, 1000);

                setTimeout(() => {
                    // count2++;
                    // console.log(`count ${count2}`);
                    clearInterval(idSetInterval);
                }, 1000);
            } else {
                const timerNumbers = document.getElementById('timer').querySelectorAll('span');
                timerNumbers.forEach((item) => {
                    item.style.color = 'red';
                    if (item.id) {
                        item.textContent = `00`;
                    }
                });
            }
        }

        updateClock();
    }
    countTimer('01 july 2020');
});