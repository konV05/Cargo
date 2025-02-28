

function form() {
    const section = document.querySelector('.calc'),
          formElem = document.querySelector('.calc__form'),
          dragArea = formElem.querySelector('.calc__droparea'),
          dragAreaLable = formElem.querySelector('.calc__droparea-file'),
          inputStep1 = formElem.querySelectorAll('.calc__input.step-1'),
          nextStepBtn = formElem.querySelector('.calc__btn.step-1'),
          prevStepBtn = formElem.querySelector('.calc__btn-small.prev-step')

    inputStep1.forEach((i) => {
        i.addEventListener('input', () => {
            i.classList.remove('invalid');
        })
    });

    nextStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let invalidCounter = 0
        
        inputStep1.forEach((item) => {
            if (item.value == false) {
                invalidCounter++
                item.classList.add('invalid');
            }
        });

        if (invalidCounter === 0) {
            section.classList.remove('step-1');
            section.classList.add('step-2');
        }
    });

    prevStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        section.classList.remove('step-2');
        section.classList.add('step-1');
    });
}

export default form