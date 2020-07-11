const filterByType = (type, ...values) => values.filter(value => typeof value === type), // Объявляем функцию, которая будет принимать 2 аргумента из функции tryFilterByType, с помощью оператора spread (...), мы преобразовываам полученные данные из value в массив, затем отфильтровываем полученные элементы массива на основе переданного типа в аргументе type

	hideAllResponseBlocks = () => { // Объявляем функцию, которая будет скрывать все диалоговые окна
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // Присваиваем переменной массив из полученных элементов с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // Перебираем все полученные элементы и присваиваем к их стилю display = none, чтобы они не отображались на экране
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // Обявляем функцию, которая принимает 3 аргумента: селектор, текст сообщения, и id span'а в которое будет выводиться сообщение
		hideAllResponseBlocks(); // Вызываем функцию, которая изначально скроет все div'ы с сообщениями
		document.querySelector(blockSelector).style.display = 'block'; // Div с переданным селектором, отображается на экране (применяем стиль к display = block) 
		if (spanSelector) { // Если был передан id span'а,
			document.querySelector(spanSelector).textContent = msgText; // то в данный span мы устанавливаем текст из переданного аргумента msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Объявляем функцию (ошибка), в которую передаем текст сообщения, и эта функция в свою очередь вызывает функцию showResponseBlock и передает в неё 3 аргумента

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Объявляем функцию (результат), в которую передаем текст сообщения, и эта функция в свою очередь вызывает функцию showResponseBlock и передает в неё 3 аргумента

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // Объявляем функцию (изначальное состояние), которая в свою очередь вызывает функцию showResponseBlock и передает в неё 1 аргумент

	tryFilterByType = (type, values) => { // Объявляем функцию и передаем в неё 2 аргумента
		try { // Запускаем конструкцию try...catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Объявляем переменную, в которую поместим строку, полученную с помощью метода join(), из данных полученных из функции filterByType, которая вызывается с помощью метода eval.
			const alertMsg = (valuesArray.length) ? // Объявляем переменную и с помощью тернарных операторов проверяем длину полученной строки
				`Данные с типом ${type}: ${valuesArray}` : // Если строка есть, то в переменную alertMsg помещаем тип и полученную строку в виде строки
				`Отсутствуют данные типа ${type}`; // Если строку получили пустую, то указываем, что данных выбранного типа нет
			showResults(alertMsg); // Передаем переменную со строкой в функцию showResult
		} catch (e) { // Если в процессе выполения try произойдет ошибка, то
			showError(`Ошибка: ${e}`); // вызываем функцию showError и передаём в неё текст ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // Объявляем переменную и присваиваем ей значение кнопки "Фильтровать"

filterButton.addEventListener('click', e => { // "Вешаем" на полученную кнопку слушатель события "click'  
	const typeInput = document.querySelector('#type'); // Присваиваем переменной значение селектора "Тип данных" (обращаемся и получаем по id)
	const dataInput = document.querySelector('#data'); // Присваиваем переменной значение инпута "Данные" (обращаемся и получаем по id)

	if (dataInput.value === '') { // Проверяем поле "Данные", пустое ли оно
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // Вызываем метод setCustomValidity, в него помещаем текст и это сообщение будет отображаться у инпута "Данные"
		showNoResults(); // Вызываем функцию, которая установит область "Результаты" в изначальное состояние
	} else { // Иначе, если инпут "Данные" не пустое
		dataInput.setCustomValidity(''); // "Обнуляем" сообщение в методе setCustomValidity
		e.preventDefault(); // Прерываем действия браузера по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // Вызываем функцию tryFilterByType и передаем в виде 2х аргументов, полученные данные из селектора "Тип данных" и инпута "Данные", в обоих случаях с помощью метода trim() убираем лишние пробелы в начале и конце строки, если таковые имеются 
	}
});

