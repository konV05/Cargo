"use strict";

function closeModal(removeClass, modal) {
    if (modal.classList.contains('active', removeClass) && !modal.classList.contains('closing')){
        modal.classList.add('closing');
        document.body.style.overflow = '';
        window.setTimeout(() => {
            modal.classList.remove('closing', 'active', removeClass);
        }, 400);
    }
}

function modal({triggerSelector, modalSelector, modalClass, closeBtnSelector}) {
    const modal = document.querySelector(modalSelector),
          triggerBtns = document.querySelectorAll(triggerSelector),
          closeBtn = document.querySelector(closeBtnSelector)
    
    function openModal() {
        if (!modal.classList.contains('active', modalClass, 'closing')){
            document.body.style.overflow = 'hidden';
            modal.classList.add(modalClass);
            window.setTimeout(() => {
                modal.classList.add('active');
            }, 0);
        }
    }

    triggerBtns.forEach((i) => {
        i.addEventListener('click', () => {
            openModal();
        });
    });

    closeBtn.addEventListener('click', () => {
        closeModal(modalClass, modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal && (modal.classList.contains(modalClass))) {
            closeModal(modalClass, modal);
        }    
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && (modal.classList.contains(modalClass))) {
            closeModal(modalClass, modal);
        }
    });


    
    // special conditions

    // if (modalClass === 'calc') {
    //     document.querySelector('.modal-calc__btn').addEventListener('click', () => {
    //         window.setTimeout(closeModal(), 0);
    //     });
    // }
}

export default modal;
export {closeModal};
