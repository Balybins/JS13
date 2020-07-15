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

export default sendForm;
