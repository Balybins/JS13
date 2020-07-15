const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content'),
        screenWidth = screen.width;
    let count = 0,
        animate;

    popup.addEventListener('click', event => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
            count = 0;
            cancelAnimationFrame(animate);
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
            }
        }
    });

    const popupAnimate = () => {
        animate = requestAnimationFrame(popupAnimate);
        count++;
        if (count < 40) {
            popupContent.style.top = count * 5 + 'px';
        } else {
            count = 0;
            cancelAnimationFrame(animate);
        }
    };

    popupBtn.forEach(items => {
        items.addEventListener('click', () => {
            popup.style.display = 'block';
            if (screenWidth >= 768) {
                animate = requestAnimationFrame(popupAnimate);
            }
        });
    });
};

export default togglePopUp;
