// eslint-disable-next-line strict
'use strict';

import popUp from './modules/popup';
import scroll from './modules/scroll';
import burgerMenu from './modules/burgerMenu';
import mainSlider from './modules/mainSlider';

//Модальные окна
popUp();
// Прокрутка страницы
scroll();
// "Липкий" бургер-меню
burgerMenu();
// Слайдер на главной странице
mainSlider();