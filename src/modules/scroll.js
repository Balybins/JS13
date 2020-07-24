const scroll = () => {
    const toTop = document.getElementById('totop'),
        headerMain = document.querySelector('.header-main');

    toTop.style.display = 'none';
    // Отобразить стрелку "вверх", после прокрутки первого блока
    window.addEventListener('scroll', () => {
        if (pageYOffset > headerMain.offsetHeight) {
            toTop.style.display = '';
        } else {
            toTop.style.display = 'none';
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