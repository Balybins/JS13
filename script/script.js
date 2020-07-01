window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Таймер
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
                let idSetInterval = setInterval(updateClock, 1000);

                setTimeout(() => {
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

    // Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            btn = document.querySelector('main>a');

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };

        const scrollTo = (elem) => {
            window.scroll({
                left: 0,
                top: elem.offsetTop,
                behavior: 'smooth'
            });
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((items) => items.addEventListener('click', (e) => {
            e.preventDefault();
            handlerMenu();
            let id = items.querySelector('a').attributes.href.value.slice(1),
                elem = document.querySelector('#' + id + '');
            scrollTo(elem);
        }));

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let id = btn.attributes.href.value.slice(1),
                elem = document.querySelector('#' + id + '');
            scrollTo(elem);
        });
    };
    toggleMenu();

    // PopUp
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            screenWidth = screen.width;
        let count = 0,
            animate;

        let popupAnimate = () => {
            animate = requestAnimationFrame(popupAnimate);
            count++;
            if (count < 40) {
                popupContent.style.top = count * 5 + 'px';
            } else {
                count = 0;
                cancelAnimationFrame(animate);
            }
        };

        popupBtn.forEach((items) => {
            items.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screenWidth >= 768) {
                    animate = requestAnimationFrame(popupAnimate);
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            count = 0;
            cancelAnimationFrame(animate);
        });
    };
    togglePopUp();
});