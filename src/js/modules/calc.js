import {closeModal} from './modal'; 

function calc() {
    const form = document.querySelector('.modal-calc__form'),
          input = form.querySelectorAll('.modal-calc__input')
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let result = 1
        input.forEach((i) => {
            result *= i.value
        });
        document.querySelector('#calc_volume').value = result;
        closeModal('calc', document.querySelector('.modal'))
        form.reset();
    });
}

export default calc;