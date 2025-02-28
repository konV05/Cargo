function dragAndDrop() {
    const dragArea = document.querySelector('.calc__droparea'),
          dragAreaLable = document.querySelector('.calc__droparea-file'),
          deleteBtn = document.querySelector('.calc__droparea-delete');
    
    let files = null;

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
        files = e.dataTransfer.files;
        window.calcFiles = e.dataTransfer.files;
        dragArea.classList.remove('drag');

        console.log(files);
        
        const checkType = Array.from(files).every((elem) => {
            return elem.type.search('image/') === 0;
        });

        const checkNumber = (files.length <= 5);

        const checkWeight = () => {
            let weight = 0
            Array.from(files).forEach((item) => {
                weight += item.size
            });       
            return ( weight <= 10485760 ) // 10485760 = 10 mb
        }

        if (checkType && checkNumber && checkWeight()) {
            dragArea.classList.add('active');
            dragAreaLable.classList.remove('invalid');
            if ( files.length === 1 ) {
                dragAreaLable.textContent = transformName(files[0].name)
            } else if ( files.length > 1 && files.length <= 5 ) {
                dragAreaLable.textContent = `Выбрано: ${files.length} фото`;
            }
        } else {
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
    });

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
        files = null;
        dragAreaLable.textContent = '';
        dragArea.classList.remove('invalid');
        dragArea.classList.remove('active');
        dragAreaLable.classList.remove('invalid');
    });
}

export default dragAndDrop