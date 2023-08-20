import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.miniSlides[0].closest('button')) {
            this.miniSlides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.miniSlides[0].querySelector('.card__title').style.opacity = '1';
            this.miniSlides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.miniSlides[1].tagName == "BUTTON" && this.miniSlides[2].tagName == "BUTTON") {
            this.container.appendChild(this.miniSlides[2]); // Btn
            this.container.appendChild(this.miniSlides[1]); // Btn
            this.container.appendChild(this.miniSlides[0]); // Slide
            this.decorizeSlides();
        } else if (this.miniSlides[1].tagName == "BUTTON"){
            this.container.appendChild(this.miniSlides[1]); // Btn
            this.container.appendChild(this.miniSlides[0]); // Slide
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.miniSlides[0]);
            this.decorizeSlides();
        }

    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
            //    console.log(this.miniSlides);

            
        });
        // console.log(this.next);
        // console.log(this.slides);

        this.prev.addEventListener('click', () => {
            for (let i = this.miniSlides.length - 1; i > 0; i--) {
                if (this.miniSlides[i].tagName !== "BUTTON") {
                    let active = this.miniSlides[i];
                    this.container.insertBefore(active, this.miniSlides[0]);
                    this.decorizeSlides();
                    break;
                }
            }

           
        });
    }

    activateAnimation() {
        const play = setInterval(() => this.nextSlide(), 5000);
        
        this.slides[0].parentNode.addEventListener('mouseenter', () => {
                clearInterval(play);
            });
        this.slides[0].parentNode.addEventListener('mouseleave', () => {
                this.activateAnimation();
            });
        this.next.parentNode.addEventListener('mouseenter', () => {
            clearInterval(play);
        });
        this.next.parentNode.addEventListener('mouseleave', () => {
            this.activateAnimation();
        });
    }


    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            this.activateAnimation();
        }
    }
}