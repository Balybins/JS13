const popup = () => {
    const freeVisit = document.querySelector('.free-visit'),
        freeVisitForm = document.getElementById('free_visit_form'),
        callbackFormBtn = document.querySelector('[data-popup="#callback_form"]'),
        callbackForm = document.getElementById('callback_form'),
        fixedGift = document.querySelector('.fixed-gift'),
        gift = document.getElementById('gift'),
        menuButton = document.querySelector('.menu-button'),
        popupMenu = document.querySelector('.popup-menu'),
        clubSelect = document.querySelector('.club-select'),
        clubsListUl = document.querySelector('.clubs-list>ul'),
        closeBtn = document.querySelectorAll('.close-form'),
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
    } catch {}

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
    closeBtn.forEach((item) => {
        item.addEventListener('click', (event) => {
            if (event.target.parentNode.parentNode.parentNode.id === 'free_visit_form') {
                freeVisitForm.style.display = 'none';
            } else if (event.target.parentNode.parentNode.parentNode.id === 'callback_form') {
                callbackForm.style.display = 'none';
            }
            try {
                if (event.target.parentNode.parentNode.parentNode.id === 'gift') {
                    gift.style.display = 'none';
                }
            } catch {}
        });
    });

    // Закрыть форму при клике на подложку
    body.addEventListener('click', () => {
        if (event.target.classList.contains('overlay')) {
            const idForm = event.target.parentNode.id;
            document.getElementById(idForm).style.display = 'none';
        }
    });

    // Закрыть форму c подарком при клике на кнопку OK
    try {
        gift.addEventListener('click', () => {
            if (event.target.classList.contains('close-btn')) {
                gift.style.display = 'none';
            }
        });
    } catch {}

    //Закрыть меню при клике на крестик, либо пункт меню
    popupMenu.addEventListener('click', () => {
        if (event.target.tagName === 'IMG' || event.target.tagName === 'A') {
            popupMenu.style.display = 'none';
        }
    });
};
export default popup;