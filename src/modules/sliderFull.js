const sliderFull = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        ul = document.querySelector('.portfolio-dots');

    const slider = () => {
        const dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        dot[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (
                event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')
            ) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (
                event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')
            ) {
                startSlide();
            }
        });
        startSlide(2000);
    };

    // dots
    const addDots = () => {
        slide.forEach(() => {
            const li = document.createElement('li');
            ul.append(li);
            li.classList.add('dot');
        });
        slider();
    };
    addDots();
};

export default sliderFull;
