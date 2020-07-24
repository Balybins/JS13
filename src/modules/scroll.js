const scroll = () => {
    const toTop = document.getElementById('totop'),
        headerMain = document.querySelector('.header-main');

    toTop.style.transform = 'translateX(100px)';
    // Отобразить стрелку "вверх", после прокрутки первого блока
    window.addEventListener('scroll', () => {
        if (pageYOffset > headerMain.offsetHeight) {
            toTop.style.transform = 'translateX(0)';
        } else {
            toTop.style.transform = 'translateX(100px)';
        }
    });
    // Плавная прокрутка вверх
    toTop.addEventListener('click', () => {
        event.preventDefault();
        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    });
};
export default scroll;