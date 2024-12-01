function accordion({wrapperSelector, itemSelector}) {
    const wrapper = document.querySelector(wrapperSelector),
          items = wrapper.querySelectorAll(itemSelector);
    
    items.forEach(element => {
        element.addEventListener('click', (event)=> {
            let active = wrapper.querySelector('.active')
            element.classList.toggle('active')
            if (active != null) {
                active.classList.remove('active')
            }
        });
    });
}

export default accordion;