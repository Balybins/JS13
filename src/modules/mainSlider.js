const mainSlider = () => {
    const mainSlider = document.querySelectorAll('.main-slider>div');
    let currentSlide = 0;

    // Функция автоматической прокрутки главного слайдера
    const autoPlaySlide = () => {
        mainSlider[currentSlide].style.display = 'none';
        currentSlide++;
        if (currentSlide >= mainSlider.length) {
            currentSlide = 0;
        }
        mainSlider[currentSlide].style.display = '';
    };

    const startSlide = () => {
        setInterval(autoPlaySlide, 3000);
    };
    startSlide();
};
export default mainSlider;
