class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 6,
        responsive = []
    }) {
        try {
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = document.querySelector(wrap).children;
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.options = {
                position,
                infinity,
                widthSlide: Math.floor(100 / this.slidesToShow)
            };
            this.responsive = responsive;
        } catch {
            console.warn('Необходимо передать свойства!');
        }
    }

    init() {
        try {
            this.addClass();
            this.addStyle();
            if (this.prev && this.next) {
                this.controlSlider();
            } else {
                this.addArrow();
                this.controlSlider();
            }
            if (this.responsive) {
                this.responseInit();
            }
        } catch {
            console.warn('Инициализация не выполнена! См. ошибку выше!');
        }
    }

    addClass() {
        this.main.classList.add('diploma-slider');
        this.wrap.classList.add('diploma-slider__wrap');
        for (const elem of this.slides) {
            elem.classList.add('diploma-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .diploma-slider {
                overflow: hidden;
                position: relative;
                padding: 0;
            }
            .diploma-slider__wrap {
                display: flex;
                transition: transform 0.5s;
                will-change: transform;
            }
            .diploma-slider__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 0 0 ${this.options.widthSlide}%;
                margin-top: 0;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'diploma-slider__prev';
        this.next.className = 'diploma-slider__next';

        this.prev.textContent = '<';
        this.next.textContent = '>';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .diploma-slider__prev, .diploma-slider__next {
                width: 36px;
                height: 37px;
                border: none;
                background-color: #f4c71b;
                border-radius: 50%;
                position: absolute;
                top: 45%;
                transform: translate(50%, -50%);
                font-size: 16px;
                font-weight: 700;
                padding-top: 4px;
                filter: drop-shadow(5px 4px 6px black);
                transition: all .4s;
                cursor: pointer;
            }
            .diploma-slider__prev:hover, 
            .diploma-slider__next:hover {
                filter: none;
            }
            .diploma-slider__prev {
                left: 8px;
            }
            .diploma-slider__next {
                right: 43px;
            }
        `;
        document.head.appendChild(style);
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow,
            allResponse = this.responsive.map(item => item.breakpoint),
            maxResponse = Math.max(...allResponse);
        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };
        checkResponse();
        window.addEventListener('resize', checkResponse);
    }
}

export default SliderCarousel;
