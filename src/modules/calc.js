const calc = () => {
    try {
        const cardOrder = document.getElementById('card_order'),
            priceTotal = document.getElementById('price-total'),
            clubPromo = document.getElementsByName('club-promo');

        // Прайс клубов
        const price = {
            mozaika: {
                1: 1999,
                6: 9900,
                9: 13900,
                12: 19900
            },
            schelkovo: {
                1: 2999,
                6: 14990,
                9: 21990,
                12: 24990
            }
        };

        // Промежуточное хранение выбранных параметров на странице
        const tempData = {
            month: 1,
            clubName: 'mozaika'
        };

        // Функция вывода цены на основе данных из объекта
        const calculate = (month = tempData.month, clubName = tempData.clubName) => {
            priceTotal.innerText = price[clubName][month];
        };
        calculate();

        // Функция проверки корректного ввода промо-кода
        const checkPromo = () => {
            if (clubPromo[0].value === 'ТЕЛО2019') {
                priceTotal.innerText = +priceTotal.innerText - (Math.floor(priceTotal.innerText * 0.3));
            }
        };

        // Слушатель выбора параметров на странице
        cardOrder.addEventListener('click', () => {
            if (event.target.name === 'card-type') {
                tempData.month = event.target.value;
                calculate(tempData.month, tempData.clubName);
                checkPromo();
            } else if (event.target.name === 'club-name') {
                tempData.clubName = event.target.value;
                calculate(tempData.month, tempData.clubName);
                checkPromo();
            }
        });

        // Вызов функции проверки промо-кода, после ввода кода
        clubPromo[0].addEventListener('input', () => {
            checkPromo();
        });
        // eslint-disable-next-line no-empty
    } catch { }
};
export default calc;
