'use strict';

const contBooks = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    liBookSecond = books[0].querySelector('ul').querySelectorAll('li'),
    liBookFifth = books[5].querySelector('ul').querySelectorAll('li'),
    liBookSix = books[2].querySelector('ul').querySelectorAll('li');
    
    console.log('liBookFifth: ', liBookFifth);

contBooks.prepend(books[1]);
books[0].after(books[4]);
books[4].after(books[3]);
books[5].after(books[2]);

liBookSecond[3].after(liBookSecond[6]);
liBookSecond[6].after(liBookSecond[8]);
liBookSecond[9].after(liBookSecond[2]);

liBookFifth[1].after(liBookFifth[9]);
liBookFifth[9].after(liBookFifth[3]);
liBookFifth[3].after(liBookFifth[4]);
liBookFifth[2].after(liBookFifth[6]);
liBookFifth[6].after(liBookFifth[7]);

books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

liBookSix[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');

document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
document.querySelector('.adv').remove();

