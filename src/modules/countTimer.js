function countTimer(deadline) {
    const timerHours = document.getElementById('timer-hours'),
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        // На будущее - рассчет дней
        // hours = Math.floor((timeRemaining / 60 / 60)) % 24;
        // days = Math.floor(timeRemaining / 60 / 60 / 24);

        return {
            timeRemaining,
            hours,
            minutes,
            seconds,
        };
    }

    function updateClock() {
        const timer = getTimeRemaining();

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
            const idSetInterval = setInterval(updateClock, 1000);

            setTimeout(() => {
                clearInterval(idSetInterval);
            }, 1000);
        } else {
            const timerNumbers = document
                .getElementById('timer')
                .querySelectorAll('span');
            timerNumbers.forEach(item => {
                item.style.color = 'red';
                if (item.id) {
                    item.textContent = '00';
                }
            });
        }
    }

    updateClock();
}

export default countTimer;
