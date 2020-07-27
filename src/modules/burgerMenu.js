const burgerMenu = () => {
    const topMenu = document.querySelector('.top-menu');
    let screenWidth = window.innerWidth;

    // Обновляем размер экрана
    window.addEventListener('resize', () => {
        screenWidth = window.innerWidth;
    });

    // Делаем бургер-меню "липким"
    window.addEventListener('scroll', () => {
        if (pageYOffset > topMenu.offsetTop && screenWidth < 768) {
            topMenu.classList.add('sticky');
        } else {
            topMenu.classList.remove('sticky');
        }
    });
};
export default burgerMenu;
