const gallery = () => {
    const slide = document.querySelectorAll('.gallery-slider>div'),
        gallerySlider = document.querySelector('.gallery-slider');

    const prev = document.createElement('button'),
        next = document.createElement('button'),
        ul = document.createElement('ul');

    prev.className = 'gallery-btn prev';
    next.className = 'gallery-btn next';
    prev.id = 'arrow-left';
    next.id = 'arrow-right';
    ul.className = 'slider-dots';

    prev.textContent = '<';
    next.textContent = '>';

    gallerySlider.appendChild(prev);
    gallerySlider.appendChild(next);
    gallerySlider.appendChild(ul);

    const style = document.createElement('style');
    style.id = 'gallery-style';
    style.textContent = `
            .gallery-slider {
                position: relative;
            }
            .gallery-btn {
                width: 36px;
                height: 37px;
                border: none;
                background-color: #f4c71b;
                border-radius: 50%;
                position: absolute;
                top: 50% ;
                transform: translate(50% , -50%);
                font-size: 16px;
                font-weight: 700;
                padding-top: 4px;
                filter: drop-shadow(5px 4px 6px black);
                transition: all .4s;
                cursor: pointer;
            }
            .prev: hover,
            .next: hover {
                filter: none;
            }
            .prev {
                left: 15px;
            }
            .next {
                right: 52px;
            }
        `;
    document.head.appendChild(style);

    const slider = () => {
        const dot = document.querySelectorAll('.slider-dots-slick'),
            slider = document.querySelector('.gallery-slider');

        dot[0].classList.add('slick-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'gallery-slider-active');
            prevSlide(dot, currentSlide, 'slick-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'gallery-slider-active');
            nextSlide(dot, currentSlide, 'slick-active');
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

            if (!target.matches('.gallery-btn, .slider-dots-slick')) {
                return;
            }
            prevSlide(slide, currentSlide, 'gallery-slider-active');
            prevSlide(dot, currentSlide, 'slick-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.slider-dots-slick')) {
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
            nextSlide(slide, currentSlide, 'gallery-slider-active');
            nextSlide(dot, currentSlide, 'slick-active');
        });

        slider.addEventListener('mouseover', event => {
            if (
                event.target.matches('.gallery-btn') ||
                event.target.matches('.slider-dots-slick')
            ) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (
                event.target.matches('.gallery-btn') ||
                event.target.matches('.slider-dots-slick')
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
            li.classList.add('slider-dots-slick');
        });
        slider();
    };
    addDots();
};
export default gallery;
