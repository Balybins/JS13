import calculate from './calc';
const sendForm = () => {
    const form = document.querySelectorAll('form'),
        statusText = document.getElementById('status-text'),
        freeVisitForm = document.getElementById('free_visit_form'),
        callbackForm = document.getElementById('callback_form'),
        thanks = document.getElementById('thanks');

    let countSendFooterForm = 0;

    const loading = 'Данные отправляются...',
        errorMessage = 'Что-то пошло не так...',
        successMessage = statusText.innerHTML,
        importantCheckbox = 'Вам необходимо подтвердить согласие',
        statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 1rem; color: red; margin-top: 1rem;';

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const sendData = items => {
        const formData = new FormData(items),
            body = {};
        formData.forEach((value, key) => {
            body[key] = value;
        });
        if (body.phone.length < 18) { // Проверка на длину введенного номера
            items.elements.phone.style.border = 'solid red';
            items.elements.phone.value = '';
            items.elements.phone.placeholder = 'Введите корректный номер телефона';
        } else if (body.name && body.name === '') { // Доп проверка на наличие введенного имени
            items.elements.name.style.border = 'solid red';
            items.elements.name.placeholder = 'Введите Ваше имя';
        } else {
            items.elements.phone.style.border = '';
            items.elements.phone.placeholder = 'Ваш номер телефона...';
            try {
                items.elements.name.style.border = '';
                items.elements.name.placeholder = 'Ваше имя...';
                // eslint-disable-next-line no-empty
            } catch { }
            thanks.style.display = 'block';
            statusText.innerHTML = loading;
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Status network not 200');
                    }
                    statusText.innerHTML = successMessage;
                    items.reset();
                    freeVisitForm.style.display = 'none';
                    callbackForm.style.display = 'none';
                    calculate('1', 'mozaika'); // Перезапуск калькулятора, после отправки формы
                })
                .catch(error => {
                    statusText.innerHTML = errorMessage;
                    console.error(error);
                })
                .finally(() => { // Автоматическое закрытие всплывающего окна
                    setTimeout(() => {
                        thanks.style.display = 'none';
                    }, 5000);
                    countSendFooterForm = 0;
                });
        }
    };

    form.forEach(items => {
        items.addEventListener('submit', event => {
            event.preventDefault();
            for (const item of items) {
                if (item.type === 'checkbox' && item.form.id !== 'footer_form') {
                    if (!item.checked) { // Проверка на согласие обработки персональных данных
                        items.appendChild(statusMessage);
                        statusMessage.textContent = importantCheckbox;
                    } else {
                        statusMessage.textContent = '';
                        sendData(items);
                    }
                } else if (item.form.id === 'footer_form' && countSendFooterForm === 0) {
                    countSendFooterForm++;
                    sendData(items);
                }
            }
        });
    });
};
export default sendForm;
