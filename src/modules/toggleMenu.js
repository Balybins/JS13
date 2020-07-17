const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        btn = document.querySelector('main>a'),
        closeBtn = document.querySelector('.close-btn'),
        body = document.querySelector('body');

    closeBtn.style.display = 'none';
    const handlerMenu = () => {
        if (
            !menu.style.transform ||
            menu.style.transform === 'translate(-100%)'
        ) {
            menu.style.transform = 'translate(0)';
            closeBtn.style.display = 'block';
        } else {
            menu.style.transform = 'translate(-100%)';
            closeBtn.style.display = 'none';
        }
    };

    body.addEventListener('click', event => {
        const target = event.target;
        if (
            target.classList.contains('menu') ||
            target.classList.contains('close-btn') ||
            target.closest('.menu')
        ) {
            handlerMenu();
        } else if (target.nodeName !== 'MENU' && target.offsetParent.nodeName === 'MENU') {
            handlerMenu();
        } else if (menu.style.transform && target.nodeName !== 'MENU' && menu.style.transform !== 'translate(-100%)') {
            handlerMenu();
        }
    });

    const scrollTo = id => {
        window.scroll({
            left: 0,
            top: id.offsetTop,
            behavior: 'smooth',
        });
    };

    menuItems.forEach(items =>
        items.addEventListener('click', e => {
            e.preventDefault();
            const id = items.querySelector('a').attributes.href.value;

            scrollTo(document.querySelector(id));
        })
    );

    btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.attributes.href.value;

        scrollTo(document.querySelector(id));
    });
};

export default toggleMenu;
