"use strict";

import menu from './modules/menu';
import modal from './modules/modal';
import calc from './modules/calc';
import accordion from './modules/accordion';
import slider from './modules/slider';
import promoSlider from './modules/promoSlider';
import form from './modules/form';
import dragAndDrop from './modules/dragAndDrop';

window.addEventListener('DOMContentLoaded', function () {
    
    menu({
        menuSelector: '.header',
        triggerBtnSelector: '.header__hamburger',
        modalSelector: '.modal',
        modalClass: 'menu'
    });
    modal({
        triggerSelector: '.calc__input-volume',
        modalSelector: '.modal',
        modalClass: 'calc',
        closeBtnSelector: '.modal-calc__close'
    });

    modal({
        triggerSelector: '.request-open-btn',
        modalSelector: '.modal',
        modalClass: 'request',
        closeBtnSelector: '.modal-request__close'
    });

    calc();

    accordion({
        wrapperSelector: '.faq__wrapper',
        itemSelector: '.faq__elem'
    });

    slider('.delivery', 500);
    slider('.services', 500);

    promoSlider();

    form();

    dragAndDrop();
});
