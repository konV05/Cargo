function promoSlider() {
    const slider = document.querySelector('.promo__window'),
          slides = slider.querySelectorAll('.promo__slide'),
          dotsWrapper = slider.querySelector('.promo__dots-wrapper'),
          dots = dotsWrapper.querySelectorAll('.promo__dot'),
          prevArrow = slider.querySelector('.promo__prev-arrow'),
          nextArrow = slider.querySelector('.promo__next-arrow');

    let index = 0;
    let moving = false;

    function updateSlider() {
        moving = true
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }
        dotsWrapper.querySelector('.active').classList.remove('active');
        dots[index].classList.add('active');
        slider.querySelector('.active_slide').classList.remove('active_slide');
        slides[index].classList.add('active_slide');
        window.setTimeout(() => {
            moving = false
        }, 600);
    }
    
    
    prevArrow.addEventListener('click', () => {
        if (!moving) {
            index--
            updateSlider();
        }
    });

    nextArrow.addEventListener('click', () => {
        if (!moving) {
            index++
            updateSlider();
        }
    });

    dots.forEach((item, i) => {
        item.addEventListener('click', () => {
            index = i;
            updateSlider();
        });
    });
}

export default promoSlider;