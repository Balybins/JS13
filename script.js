document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const chooseCar = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200 && select.value !== 'no') {
                    const data = JSON.parse(request.responseText);
                    console.log(request.readyState);
                    console.log(request.status);
                    console.log(data);
                    resolve(data);
                } else {
                    console.log('Произошла ошибка');
                    reject();
                }
            });
        });
    };

    const showCar = data => {
        console.warn(data);
        console.warn(select.value);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const { brand, model, price } = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
    };

    const error = () => {
        output.innerHTML = 'Произошла ошибка';
    };

    select.addEventListener('change', () => {
        chooseCar()
            .then(showCar)
            .catch(error);
    });
});
