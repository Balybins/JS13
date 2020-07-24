// eslint-disable-next-line strict
'use strict';

import popUp from './modules/popup';
import scroll from './modules/scroll';
import burgerMenu from './modules/burgerMenu';
import mainSlider from './modules/mainSlider';
import SliderCarousel from './modules/carousel';

//Модальные окна
popUp();
// Прокрутка страницы
scroll();
// "Липкий" бургер-меню
burgerMenu();
// Слайдер на главной странице
mainSlider();
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