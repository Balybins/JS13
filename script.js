document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const chooseCar = () => {
        return new Promise((resolve, reject) => {
            if (select.value !== 'no') {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.send();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        resolve(data);
                    } else {
                        const error = 'Призошла ошибка!';
                        reject(error);
                    }
                });
            } else {
                const error = 'Выберите авто!';
                reject(error);
            }
        });
    };

    const showCar = data => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const { brand, model, price } = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
    };

    const error = error => output.innerHTML = error;

    select.addEventListener('change', () => {
        chooseCar()
            .then(showCar)
            .catch(error);
    });
});
