

function form() {
    const section = document.querySelector('.calc'),
          formElem = document.querySelector('.calc__form'),
          dragArea = formElem.querySelector('.calc__droparea'),
          inputStep1 = formElem.querySelectorAll('.calc__input.step-1[required]'),
          inputs = formElem.querySelectorAll('.calc__input[required]'),
          nextStepBtn = formElem.querySelector('.calc__btn.step-1'),
          prevStepBtn = formElem.querySelector('.calc__btn-small.prev-step');

    inputStep1.forEach((i) => {
        i.addEventListener('input', () => {
            i.classList.remove('invalid');
        })
    });

    nextStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let invalidCounter = 0;
        
        inputStep1.forEach((item) => {
            if (item.value == false) {
                invalidCounter++
                item.classList.add('invalid');
            }
        });

        if (dragArea.classList.contains('invalid')) {
            invalidCounter++
        }

        if (invalidCounter === 0) {
            section.classList.remove('step-1');
            section.classList.add('step-2');
        }
    });

    prevStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveToPrevStep();
    });

    function moveToPrevStep() {
        section.classList.remove('step-2');
        section.classList.add('step-1');
    }

    formElem.addEventListener('submit', (e) => {
        let invalidCounter = 0;
        let invalidInStep1 = false;
        e.preventDefault();

        inputs.forEach((item) => {
            if (item.value == false) {
                invalidCounter++
                if (item.value == false && item.classList.contains('step-1')) {
                    invalidInStep1 = true;
                }
                item.classList.add('invalid');
            }
        });
        
        if (invalidCounter === 0 && invalidInStep1 === false) {
            const formData = new FormData(formElem);

            // section.classList.remove('step-2');
            // section.classList.add('step-3');

            console.log('--- FormData Contents ---');
            for (const [key, value] of formData.entries()) {
                console.log(`Key: ${key}, Value:`, value);
            }

            // СКРИПТ ОТПРАВКИ ДАННЫХ НА СЕВРЕР

            // fetch('url', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     },
            //     body: formData
            // }).then(response => {
            //     if (!response.ok) throw new Error('Network error');
            //     section.classList.remove('step-2');
            //     section.classList.add('step-3');
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });

        } else if (invalidCounter !== 0 && invalidInStep1 === true) {
            moveToPrevStep();
        }
    });
}

export default form