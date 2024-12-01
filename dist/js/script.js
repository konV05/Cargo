/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function accordion({
  wrapperSelector,
  itemSelector
}) {
  const wrapper = document.querySelector(wrapperSelector),
    items = wrapper.querySelectorAll(itemSelector);
  items.forEach(element => {
    element.addEventListener('click', event => {
      let active = wrapper.querySelector('.active');
      element.classList.toggle('active');
      if (active != null) {
        active.classList.remove('active');
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accordion);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");

function calc() {
  const form = document.querySelector('.modal-calc__form'),
    input = form.querySelectorAll('.modal-calc__input');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let result = 1;
    input.forEach(i => {
      result *= i.value;
    });
    document.querySelector('#calc_volume').value = result;
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('calc', document.querySelector('.modal'));
    form.reset();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/menu.js":
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu({
  triggerBtnSelector,
  modalSelector,
  menuSelector,
  modalClass
}) {
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
        console.log(`modal closed by ${modalClass}`);
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
  modal.addEventListener('click', e => {
    if (e.target == modal && modal.classList.contains(modalClass)) {
      closeMenu();
    }
  });
  modal.querySelectorAll('a').forEach(i => {
    i.addEventListener('click', () => {
      closeMenu();
    });
  });
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains(modalClass)) {
      closeMenu();
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function closeModal(removeClass, modal) {
  if (modal.classList.contains('active', removeClass) && !modal.classList.contains('closing')) {
    modal.classList.add('closing');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      modal.classList.remove('closing', 'active', removeClass);
    }, 400);
  }
}
function modal({
  triggerSelector,
  modalSelector,
  modalClass,
  closeBtnSelector
}) {
  const modal = document.querySelector(modalSelector),
    triggerBtns = document.querySelectorAll(triggerSelector),
    closeBtn = document.querySelector(closeBtnSelector);
  function openModal() {
    if (!modal.classList.contains('active', modalClass, 'closing')) {
      document.body.style.overflow = 'hidden';
      modal.classList.add(modalClass);
      window.setTimeout(() => {
        modal.classList.add('active');
      }, 0);
    }
  }
  triggerBtns.forEach(i => {
    i.addEventListener('click', () => {
      openModal();
    });
  });
  closeBtn.addEventListener('click', () => {
    closeModal(modalClass, modal);
  });
  modal.addEventListener('click', e => {
    if (e.target == modal && modal.classList.contains(modalClass)) {
      closeModal(modalClass, modal);
    }
  });
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains(modalClass)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(sliderSectionSelector, animationTime) {
  const slider = document.querySelector(sliderSectionSelector + '__slider'),
    field = slider.querySelector(sliderSectionSelector + '__field'),
    nextArrow = slider.querySelector(sliderSectionSelector + '__next-arrow'),
    prevArrow = slider.querySelector(sliderSectionSelector + '__prev-arrow'),
    slides = slider.querySelectorAll(sliderSectionSelector + '__slide'),
    sliderStyle = window.getComputedStyle(slider, null);
  let sliderIndex = 1,
    slideWidth = +sliderStyle.getPropertyValue('--slide-width').replace(/px/, '') + +sliderStyle.getPropertyValue('--slide-gap').replace(/px/, ''),
    fakeSlides = Math.floor(sliderStyle.getPropertyValue('--on-screen-slides') / 2) + 1,
    moving = false;
  function createFakeSlides() {
    slider.style.setProperty('--fake-slides', `${fakeSlides}`);
    for (let i = 0; i < fakeSlides; i++) {
      const fakeSlide = document.createElement('div');
      slides[i].classList.forEach(i => {
        fakeSlide.classList.add(i);
      });
      fakeSlide.classList.add('fake-slide');
      fakeSlide.innerHTML = slides[i].innerHTML;
      field.append(fakeSlide);
    }
    for (let i = 0; i < fakeSlides; i++) {
      const fakeSlide = document.createElement('div');
      slides[slides.length - 1 - i].classList.forEach(i => {
        fakeSlide.classList.add(i);
      });
      fakeSlide.classList.add('fake-slide');
      fakeSlide.innerHTML = slides[slides.length - 1 - i].innerHTML;
      field.prepend(fakeSlide);
      field.style.transform = `translateX(${slideWidth * fakeSlides * -1}px)`;
    }
  }
  createFakeSlides();
  function nextSlide() {
    if (!moving) {
      moving = true;
      sliderIndex++;
      field.style.transform = `translateX(${(sliderIndex + fakeSlides - 1) * slideWidth * -1}px)`;
      if (sliderIndex > slides.length - 1) {
        window.setTimeout(() => {
          field.style.transition = 'unset';
          sliderIndex = 0;
          field.style.transform = `translateX(${(sliderIndex + fakeSlides - 1) * slideWidth * -1}px)`;
          window.setTimeout(() => {
            field.style.transition = '';
          }, 2);
        }, animationTime);
      }
      window.setTimeout(() => {
        moving = false;
      }, animationTime + 10);
    }
  }
  function prevSlide() {
    if (!moving) {
      moving = true;
      sliderIndex--;
      field.style.transform = `translateX(${(sliderIndex + fakeSlides - 1) * slideWidth * -1}px)`;
      if (sliderIndex < 0) {
        window.setTimeout(() => {
          field.style.transition = 'unset';
          sliderIndex = slides.length - 1;
          field.style.transform = `translateX(${(sliderIndex + fakeSlides - 1) * slideWidth * -1}px)`;
          window.setTimeout(() => {
            field.style.transition = '';
          }, 2);
        }, animationTime);
      }
      window.setTimeout(() => {
        moving = false;
      }, animationTime + 10);
    }
  }
  nextArrow.addEventListener('click', () => {
    nextSlide();
  });
  prevArrow.addEventListener('click', () => {
    prevSlide();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./src/js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");







window.addEventListener('DOMContentLoaded', function () {
  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])({
    menuSelector: '.header',
    triggerBtnSelector: '.header__hamburger',
    modalSelector: '.modal',
    modalClass: 'menu'
  });
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])({
    triggerSelector: '.calc__input-volume',
    modalSelector: '.modal',
    modalClass: 'calc',
    closeBtnSelector: '.modal-calc__close'
  });
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])({
    triggerSelector: '.request-open-btn',
    modalSelector: '.modal',
    modalClass: 'request',
    closeBtnSelector: '.modal-request__close'
  });
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_3__["default"])({
    wrapperSelector: '.faq__wrapper',
    itemSelector: '.faq__elem'
  });
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])('.delivery', 500);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])('.services', 500);
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map