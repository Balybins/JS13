// eslint-disable-next-line strict
'use strict';

import popUp from './modules/popup';
import scroll from './modules/scroll';
import burgerMenu from './modules/burgerMenu';
import mainSlider from './modules/mainSlider';
import SliderCarousel from './modules/carousel';
import gallery from './modules/gallery';
import calc from './modules/calc';
import validator from './modules/validator';
import sendForm from './modules/sendForm';

//Модальные окна
popUp();
// Прокрутка страницы
scroll();
// "Липкий" бургер-меню
burgerMenu();
// Слайдер на главной странице
mainSlider();
// Фотогаллерея
gallery();
// Карусель
const carousel = new SliderCarousel({
    main: '#services>div',
    wrap: '.services-slider',
    // prev: '#left',
    // next: '#right',
    slidesToShow: 5,
    infinity: true,
    responsive: [{
        breakpoint: 1024,
        slidesToShow: 3
    },
    {
        breakpoint: 768,
        slidesToShow: 2
    },
    {
        breakpoint: 576,
        slidesToShow: 1
    }
    ]
});
carousel.init();
// Калькулятор
calc();
// Валидатор (только русские быквы и маска телефона)
validator();
// Отправка форм
sendForm();
