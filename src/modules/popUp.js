const popup = () => {
    const freeVisit = document.querySelector('.free-visit'),
        freeVisitForm = document.getElementById('free_visit_form'),
        callbackFormBtn = document.querySelector('[data-popup="#callback_form"]'),
        callbackForm = document.getElementById('callback_form'),
        fixedGift = document.querySelector('.fixed-gift'),
        gift = document.getElementById('gift'),
        thanks = document.getElementById('thanks'),
        menuButton = document.querySelector('.menu-button'),
        popupMenu = document.querySelector('.popup-menu'),
        clubSelect = document.querySelector('.club-select'),
        clubsListUl = document.querySelector('.clubs-list>ul'),
        closeForm = document.querySelectorAll('.close-form'),
        closeBtn = document.querySelectorAll('.close-btn'),
        body = document.querySelector('body');

    // Отобразить модальное окно free_visit_form
    freeVisit.addEventListener('click', () => {
        freeVisitForm.style.display = 'block';
    });

    // Отобразить модальное окно callback_form
    callbackFormBtn.addEventListener('click', () => {
        callbackForm.style.display = 'block';
    });

    // Отобразить модальное окно gift
    try {
        fixedGift.addEventListener('click', () => {
            gift.style.display = 'block';
            fixedGift.style.display = 'none';
        });
        // eslint-disable-next-line no-empty
    } catch { }

    // Отобразить модальное окно popup-menu
    menuButton.addEventListener('click', () => {
        popupMenu.style.display = 'flex';
    });

    clubSelect.addEventListener('click', () => {
        if (!clubsListUl.style.display) {
            clubsListUl.style.display = 'block';
        } else {
            clubsListUl.style.display = '';
        }
    });

    // Закрыть форму при клике на крестик
    closeForm.forEach(item => {
        item.addEventListener('click', event => {
            if (event.target.parentNode.parentNode.parentNode.id === 'free_visit_form') {
                freeVisitForm.style.display = 'none';
            } else if (event.target.parentNode.parentNode.parentNode.id === 'callback_form') {
                callbackForm.style.display = 'none';
            } else if (event.target.parentNode.parentNode.parentNode.id === 'thanks') {
                thanks.style.display = 'none';
            }
            try {
                if (event.target.parentNode.parentNode.parentNode.id === 'gift') {
                    gift.style.display = 'none';
                }
                // eslint-disable-next-line no-empty
            } catch { }
        });
    });

    // Закрыть форму при клике на подложку
    body.addEventListener('click', () => {
        if (event.target.classList.contains('overlay')) {
            const idForm = event.target.parentNode.id;
            document.getElementById(idForm).style.display = 'none';
        }
    });

    // Закрыть форму при клике на кнопку ОК
    closeBtn.forEach(item => {
        item.addEventListener('click', event => {
            if (event.target.parentNode.parentNode.parentNode.id === 'thanks') {
                thanks.style.display = 'none';
            }
            try {
                if (event.target.parentNode.parentNode.parentNode.id === 'gift') {
                    gift.style.display = 'none';
                }
                // eslint-disable-next-line no-empty
            } catch { }
        });
    });

    //Закрыть меню при клике на крестик, либо пункт меню
    popupMenu.addEventListener('click', () => {
        if (event.target.tagName === 'IMG' || event.target.tagName === 'A') {
            popupMenu.style.display = 'none';
        }
    });
};
export default popup;
