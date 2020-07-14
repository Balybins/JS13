window.addEventListener('DOMContentLoaded', () => {
	// 'use strict';

	// Таймер
	function countTimer(deadline) {
		const timerHours = document.getElementById('timer-hours'),
			timerMinutes = document.getElementById('timer-minutes'),
			timerSeconds = document.getElementById('timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			// На будущее - рассчет дней
			// hours = Math.floor((timeRemaining / 60 / 60)) % 24;
			// days = Math.floor(timeRemaining / 60 / 60 / 24);

			return {
				timeRemaining,
				hours,
				minutes,
				seconds,
			};
		}

		function updateClock() {
			const timer = getTimeRemaining();

			if (String(timer.hours).length === 1) {
				timerHours.textContent = `0${timer.hours}`;
			} else {
				timerHours.textContent = timer.hours;
			}
			if (String(timer.minutes).length === 1) {
				timerMinutes.textContent = `0${timer.minutes}`;
			} else {
				timerMinutes.textContent = timer.minutes;
			}
			if (String(timer.seconds).length === 1) {
				timerSeconds.textContent = `0${timer.seconds}`;
			} else {
				timerSeconds.textContent = timer.seconds;
			}

			if (timer.timeRemaining > 0) {
				const idSetInterval = setInterval(updateClock, 1000);

				setTimeout(() => {
					clearInterval(idSetInterval);
				}, 1000);
			} else {
				const timerNumbers = document
					.getElementById('timer')
					.querySelectorAll('span');
				timerNumbers.forEach(item => {
					item.style.color = 'red';
					if (item.id) {
						item.textContent = '00';
					}
				});
			}
		}

		updateClock();
	}
	countTimer('01 aug 2020');

	// Меню
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
	toggleMenu();

	// PopUp
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
	togglePopUp();

	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContenet = index => {
			tabContent.forEach((items, i) => {
				if (index === i) {
					tabContent[i].classList.remove('d-none');
					tab[i].classList.add('active');
				} else {
					tabContent[i].classList.add('d-none');
					tab[i].classList.remove('active');
				}
			});
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, index) => {
					if (item === target) {
						toggleTabContenet(index);
					}
				});
			}
		});
	};
	tabs();

	// slider
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

	const addDots = () => {
		slide.forEach(() => {
			const li = document.createElement('li');
			ul.append(li);
			li.classList.add('dot');
		});
		slider();
	};
	addDots();

	// Change img
	const command = document.getElementById('command');

	command.addEventListener('mouseover', event => {
		if (event.target.matches('.command__photo')) {
			const origImg = event.target.src,
				newImg = event.target.dataset.img;

			const newImage = () => {
				event.target.src = newImg;
				event.target.removeEventListener('mouseenter', newImage);
			};
			event.target.addEventListener('mouseenter', newImage);

			const origImage = () => {
				event.target.src = origImg;
				event.target.removeEventListener('mouseleave', origImage);
			};
			event.target.addEventListener('mouseleave', origImage);
		}

	});

	// Only numbers
	const calcInputs = document.getElementById('calc');

	calcInputs.addEventListener('click', event => {
		if (event.target.tagName === 'INPUT') {
			event.target.addEventListener('input', () => {
				const notNumbers = /\D/;
				event.target.value = event.target.value.replace(notNumbers, '');
			});
		}
	});

	// Калькулятор
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				const random = setInterval(() => {
					totalValue.textContent = Math.floor(Math.random() * 1000);
				}, 10);
				setTimeout(() => {
					clearInterval(random);
					total = price * typeValue * squareValue * countValue * dayValue;
					totalValue.textContent = Math.floor(total);
				}, 300);
			}
			totalValue.textContent = Math.floor(total);
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};
	calc(100);

	// send ajax form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
			successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

		const body = document.querySelector('body'),
			loadingDiv = document.createElement('div');

		loadingDiv.classList.add('popup');
		loadingDiv.innerHTML = `
			<img src="./images/loading.gif" alt="" style="position: fixed; left: 48%; top: 50%;"> 
		`;
		body.appendChild(loadingDiv);

		const form = document.getElementsByName('user_form'),
			statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem; color: white;';

		const postData = body => fetch('./server.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		form.forEach(elem => {
			const onlyRu = /[^а-яА-Я\s]+/;
			for (const inputsRu of elem) {
				if (inputsRu.name === 'user_name' || inputsRu.name === 'user_message') {
					inputsRu.addEventListener('input', () => {
						inputsRu.value = inputsRu.value.replace(onlyRu, '');
						inputsRu.value = inputsRu.value.trim();
					});
				}
			}

			elem.addEventListener('submit', event => {
				event.preventDefault();
				const formData = new FormData(elem),
					body = {};
				formData.forEach((value, key) => {
					body[key] = value;
				});
				if (body.user_phone.length < 19) {
					elem.elements.user_phone.style.border = 'solid red';
					elem.elements.user_phone.value = '';
					elem.elements.user_phone.placeholder = 'Введите корректный номер телефона';
				} else {
					elem.elements.user_phone.style.border = '';
					elem.elements.user_phone.placeholder = 'Ваш номер телефона';
					elem.appendChild(statusMessage);
					loadingDiv.style.display = 'block';
					statusMessage.textContent = '';
					postData(body)
						.then(response => {
							if (response.status !== 200) {
								throw new Error('Status network not 200');
							}
							loadingDiv.style.display = 'none';
							statusMessage.textContent = successMessage;
							elem.reset();
						})
						.catch(error => {
							loadingDiv.style.display = 'none';
							statusMessage.textContent = errorMessage;
							console.error(error);
						});
				}
			});
		});
	};
	sendForm();

	maskPhone('.form-phone', '+996 (___) __-__-__');
});
