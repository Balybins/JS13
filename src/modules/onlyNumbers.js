const onlyNumbers = () => {
    const calcInputs = document.getElementById('calc');
    calcInputs.addEventListener('click', event => {
        if (event.target.tagName === 'INPUT') {
            event.target.addEventListener('input', () => {
                const notNumbers = /\D/;
                event.target.value = event.target.value.replace(notNumbers, '');
            });
        }
    });
};

export default onlyNumbers;
