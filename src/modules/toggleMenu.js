const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        btn = document.querySelector('main>a'),
        body = document.querySelector('body');

    const handlerMenu = () => {
        if (
            !menu.style.transform ||
            menu.style.transform === 'translate(-100%)'
        ) {
            menu.style.transform = 'translate(0)';
        } else {
            menu.style.transform = 'translate(-100%)';
        }
    };

    body.addEventListener('click', event => {
        let target = event.target;
        if (
            target.classList.contains('menu') ||
            target.classList.contains('close-btn') ||
            target.classList.contains('menu')
        ) {
            handlerMenu();
        } else {
            target = target.closest('.menu');
            if (target) {
                handlerMenu();
            }
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
