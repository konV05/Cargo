function menu({triggerBtnSelector, modalSelector, menuSelector, modalClass}) {
    const menu = document.querySelector(menuSelector),
          triggerBtn = document.querySelector(triggerBtnSelector),
          modal = document.querySelector(modalSelector);
    
    function openMenu() {
        if (modal.classList.length == 1) {
            document.body.style.overflow = 'hidden';
            modal.classList.add(modalClass);
            menu.classList.add('menu_active');
            triggerBtn.classList.add('active');
            window.setTimeout(() => {
                modal.classList.add('active');
            }, 0);
        }
    }

    function closeMenu() {
        if (modal.classList.contains('active', modalClass) && !modal.classList.contains('closing')) {
            modal.classList.add('closing');
            window.setTimeout(() => {
                console.log(`modal closed by ${modalClass}`)
                modal.classList.remove('active', modalClass, 'closing');
                menu.classList.remove('menu_active');
                triggerBtn.classList.remove('active');
            }, 400);
            document.body.style.overflow = '';
        }
    }


    triggerBtn.addEventListener('click', () => {
        if (modal.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal && (modal.classList.contains(modalClass))) {
            closeMenu();
        }
    });
    
    modal.querySelectorAll('a').forEach((i) => {
        i.addEventListener('click', () => {
            closeMenu();
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && (modal.classList.contains(modalClass))) {
            closeMenu();
        }
    });
}

export default menu;