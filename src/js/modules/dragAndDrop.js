function dragAndDrop() {
    const dragArea = document.querySelector('.calc__droparea'),
          dragAreaLable = document.querySelector('.calc__droparea-file'),
          input = document.querySelector('.calc__droparea-input'),
          deleteBtn = document.querySelector('.calc__droparea-delete');

    // let input.files = input.files;

    input.addEventListener('change', () => {
        dataProcessing();
    });

    dragArea.addEventListener('dragenter', () => {
        dragArea.classList.add('drag');
    });

    dragArea.addEventListener('dragleave', () => {
        dragArea.classList.remove('drag');
    });

    dragArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });   

    dragArea.addEventListener('drop', (e) => {
        e.preventDefault();
        input.files = e.dataTransfer.files;
        dragArea.classList.remove('drag');

        dataProcessing();
    });

    function dataProcessing() {

        console.log(input.files)

        const checkType = Array.from(input.files).every((elem) => {
            return elem.type.search('image/') === 0;
        });

        const checkNumber = (input.files.length <= 5);

        const checkWeight = () => {
            let weight = 0
            Array.from(input.files).forEach((item) => {
                weight += item.size
            });       
            return ( weight <= 10485760 ) // 10485760 = 10 mb
        }

        if (checkType && checkNumber && checkWeight()) {
            dragArea.classList.add('active');
            dragAreaLable.classList.remove('invalid');
            if ( input.files.length === 1 ) {
                dragAreaLable.textContent = transformName(input.files[0].name)
            } else if ( input.files.length > 1 && input.files.length <= 5 ) {
                dragAreaLable.textContent = `Выбрано: ${input.files.length} фото`;
            }
        } else {
            dragArea.classList.remove('active');
            dragArea.classList.add('invalid');
            dragAreaLable.classList.add('invalid');
            let errorMessage = 'Ошибка: Неправильный'
            if (!checkType) {
                errorMessage += ' Тип,'
            }
            if (!checkNumber) {
                errorMessage += ' Кол-во,'
            }
            if (!checkWeight()) {
                errorMessage += ' Вес,'
            }
            dragAreaLable.textContent = errorMessage.slice(0, -1) + ' файлов'
        }
    } 

    function transformName(name) {
        if ( name.length <= 40 ) return name
        else {
            const lastDotIndex = name.lastIndexOf('.');
            const firstPart = name.slice(0, 10);
            const secondPart = name.slice(lastDotIndex - 3, lastDotIndex)
            const typePart = name.slice(lastDotIndex + 1);
            return `${firstPart}...${secondPart}.${typePart}`
        }
    }

    deleteBtn.addEventListener('click', () => {
        input.files = null;
        dragAreaLable.textContent = '';
        dragArea.classList.remove('invalid');
        dragArea.classList.remove('active');
        dragAreaLable.classList.remove('invalid');
    });
}

export default dragAndDrop