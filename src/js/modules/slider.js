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
        moving = false
    
    function createFakeSlides() {
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
    }
    
    createFakeSlides()

    function nextSlide() {
        if (!moving){
            moving = true
            sliderIndex++;
            field.style.transform = `translateX(${(sliderIndex + fakeSlides -1 )*slideWidth * -1}px)`;
            if (sliderIndex > slides.length - 1) {
                window.setTimeout(() => {
                    field.style.transition = 'unset';
                    sliderIndex = 0;
                    field.style.transform = `translateX(${(sliderIndex + fakeSlides -1 )*slideWidth * -1}px)`;
                    window.setTimeout(() => {
                        field.style.transition = '';
                    }, 2);
                }, animationTime)
            }
            window.setTimeout( () => {
                moving = false
            }, animationTime+10)
        }
    }

    function prevSlide() {
        if (!moving){
            moving = true
            sliderIndex--;
            field.style.transform = `translateX(${(sliderIndex + fakeSlides -1 )*slideWidth * -1}px)`;
            if (sliderIndex < 0) {
                window.setTimeout(() => {
                    field.style.transition = 'unset';
                    sliderIndex = slides.length-1;
                    field.style.transform = `translateX(${(sliderIndex + fakeSlides -1 )*slideWidth * -1}px)`;
                    window.setTimeout(() => {
                        field.style.transition = '';
                    }, 2);
                }, animationTime)
            }
            window.setTimeout( () => {
                moving = false
            }, animationTime+10)
        }
    }

    nextArrow.addEventListener('click', () => {
        nextSlide();
    });

    prevArrow.addEventListener('click', () => {
        prevSlide();
    });
}

export default slider;