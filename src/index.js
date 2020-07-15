'use strict';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import sliderFull from './modules/sliderFull';
import changeImg from './modules/changeImg';
import onlyNumbers from './modules/onlyNumbers';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';

// Таймер
countTimer('01 aug 2020');
// Меню
toggleMenu();
// PopUp
togglePopUp();
// tabs
tabs();
// slider
sliderFull();
// Change img
changeImg();
// Only numbers
onlyNumbers();
// Калькулятор
calc(100);
// send ajax form
sendForm();
// mask
maskPhone('.form-phone', '+996 (___) __-__-__');
