function slider(sliderSectionSelector, animationTime) {
    const slider = document.querySelector(sliderSectionSelector + '__slider'),
          field = slider.querySelector(sliderSectionSelector + '__field'),
          nextArrow = slider.querySelector(sliderSectionSelector + '__next-arrow'),
          prevArrow = slider.querySelector(sliderSectionSelector + '__prev-arrow'),
          slides = slider.querySelectorAll(sliderSectionSelector + '__slide'),
          dots = slider.querySelectorAll(sliderSectionSelector + '__dots'),
          sliderStyle = window.getComputedStyle(slider, null);

    let sliderIndex = Math.floor(sliderStyle.getPropertyValue('--on-screen-slides') / 2),
        slideWidth = +sliderStyle.getPropertyValue('--slide-width').replace(/px/, '') + +sliderStyle.getPropertyValue('--slide-gap').replace(/px/, ''),
        fakeSlides = Math.floor(sliderStyle.getPropertyValue('--on-screen-slides') / 2) + 1,
        moving = false;
    
    (function() { //createFakeSlides
        slider.style.setProperty('--fake-slides', `${fakeSlides}`);
        for (let i = 0; i < fakeSlides; i++) {
            const fakeSlide = document.createElement('div');
            slides[i].classList.forEach((i) => {
                fakeSlide.classList.add(i);
            });
            fakeSlide.classList.add('fake-slide');
            fakeSlide.innerHTML = slides[i].innerHTML
            field.append(fakeSlide)
        }
        for (let i = 0; i < fakeSlides; i++) {
            const fakeSlide = document.createElement('div');
            slides[slides.length - 1 - i].classList.forEach((i) => {
                fakeSlide.classList.add(i);
            });
            fakeSlide.classList.add('fake-slide');
            fakeSlide.innerHTML = slides[slides.length - 1 - i].innerHTML
            field.prepend(fakeSlide)
            field.style.transform = `translateX(${slideWidth * fakeSlides * -1}px)`;
        }
    })();
    
    dots[sliderIndex].classList.add('active')

    function changeActiveDot() {
        slider.querySelector('.active'+sliderSectionSelector+'__dots').classList.remove('active');
        dots[sliderIndex].classList.add('active');
    }

    function nextSlide() {
        if (!moving){
            moving = true
            sliderIndex++;
            field.style.transform = `translateX(${(sliderIndex + 1 )*slideWidth * -1}px)`;
            if (sliderIndex > slides.length - 1) {
                sliderIndex = 0;
                changeActiveDot()
                window.setTimeout(() => {
                    field.style.transition = 'unset';
                    field.style.transform = `translateX(${(sliderIndex + 1 )*slideWidth * -1}px)`;
                    window.setTimeout(() => {
                        field.style.transition = '';
                        moving = false
                    }, 2);
                }, animationTime + 50)
            } else {
                changeActiveDot()
                window.setTimeout( () => { 
                    moving = false
                }, animationTime + 50)
            }
        }
    }

    function prevSlide() {
        if (!moving){
            moving = true
            sliderIndex--;
            field.style.transform = `translateX(${(sliderIndex + 1 )*slideWidth * -1}px)`;
            if (sliderIndex < 0) {
                sliderIndex = slides.length-1;
                changeActiveDot()
                window.setTimeout(() => {
                    field.style.transition = 'unset';
                    field.style.transform = `translateX(${(sliderIndex + 1 )*slideWidth * -1}px)`;
                    window.setTimeout(() => {
                        field.style.transition = '';
                        moving = false
                    }, 2);
                }, animationTime + 50)
            } else {
                changeActiveDot()
                window.setTimeout( () => {
                    moving = false
                }, animationTime + 50)
            }
        }
    }

    nextArrow.addEventListener('click', () => {
        nextSlide();
    });

    prevArrow.addEventListener('click', () => {
        prevSlide();
    });

    let touchstartX = 0
    let touchendX = 0

    slider.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX
    });

    slider.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX
        if (touchstartX < touchendX) {
            prevSlide();
        } else if (touchstartX > touchendX) {
            nextSlide();
        }
    });

    dots.forEach((item, index) => {
        item.addEventListener('click', () => {
            sliderIndex = index;
            field.style.transform = `translateX(${(sliderIndex + 1 )*slideWidth * -1}px)`;
            changeActiveDot();
        });
    });

}

export default slider;