const changeImg = () => {
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
};

export default changeImg;
