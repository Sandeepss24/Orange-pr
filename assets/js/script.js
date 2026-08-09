document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.opr-hero__slide');
    const dots = document.querySelectorAll('.opr-hero__dot');
    const prevBtn = document.querySelector('.opr-hero__prev-btn');
    const nextBtn = document.querySelector('.opr-hero__next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayTimer; 

    function updateSlider(index) {
        
        slides.forEach(slide => slide.classList.remove('opr-hero__slide--active'));
        dots.forEach(dot => dot.classList.remove('opr-hero__dot--active'));

        
        slides[index].classList.add('opr-hero__slide--active');
        if(dots[index]) {
            dots[index].classList.add('opr-hero__dot--active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider(currentSlide);
    }

    
    function startAutoplay() {
        
        autoplayTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay(); 
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay(); 
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider(currentSlide);
            resetAutoplay(); 
        });
    });

    const playButtons = document.querySelectorAll('.opr-hero__play-button');
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Play video functionality would go here!');
        });
    });

    startAutoplay();
});

/* mobile menu toggle */
   document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.opr-hero__menu-btn');
    const navMenu = document.querySelector('.opr-hero__nav ul');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            // Toggles the visibility of the menu
            navMenu.classList.toggle('is-active');
            
            menuBtn.classList.toggle('is-active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-active');
                menuBtn.classList.remove('is-active');
            });
        });
    }
});
/*  */

/* count runs */
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.opr-think__stat-number');
    
    // Function to run the counting animation
    const animateCounter = (el) => {
        const target = parseInt(el.textContent, 10);
        const duration = 2000; 
        const frameRate = 1000 / 60; 
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            if (currentFrame >= totalFrames) {
                el.textContent = target; 
                clearInterval(counter);
            } else {
                el.textContent = currentCount;
            }
        }, frameRate);
    };

    const observerOptions = {
        root: null,
        threshold: 0.3 
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                observerInstance.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const statsWrapper = document.querySelector('.opr-think__stats-wrapper');
    if (statsWrapper) {
        observer.observe(statsWrapper);
    }
});
/*  */

/* what we do pagination */
    const serviceCards = document.querySelectorAll('.opr-experts__card');
    const servicePageBtns = document.querySelectorAll('.opr-experts__page-btn');
    const totalServiceCards = serviceCards.length;

    function updateServicesSlider(activeIndex) {
        
        serviceCards.forEach(card => {
            card.classList.remove('opr-experts__card--active');
            card.classList.remove('opr-experts__card--medium');
            card.classList.remove('opr-experts__card--small');
        });
        servicePageBtns.forEach(btn => btn.classList.remove('opr-experts__page-btn--active'));

        
        serviceCards.forEach((card, i) => {
            
            let order = (i - activeIndex + totalServiceCards) % totalServiceCards;
            card.style.order = order;

            if (order === 0) {
                card.classList.add('opr-experts__card--active');
            } else if (order === 1) {
                card.classList.add('opr-experts__card--medium');
            } else {
                card.classList.add('opr-experts__card--small');
            }
        });

        // Add active class to selected pagination
        if(servicePageBtns[activeIndex]) servicePageBtns[activeIndex].classList.add('opr-experts__page-btn--active');

        const sliderRightContainer = document.querySelector('.opr-experts__right');
        if (sliderRightContainer) {
            sliderRightContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }

    if (serviceCards.length > 0) {
        updateServicesSlider(0);
    }

    
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateServicesSlider(index);
        });
    });

    servicePageBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            updateServicesSlider(index);
        });
    });

/*  */

/* testimonials */
 const testSlides = document.querySelectorAll('.opr-testimonials__slide');
    const testPages = document.querySelectorAll('.opr-testimonials__page');
    const prevTestArrow = document.querySelector('.opr-testimonials__arrow--prev');
    const nextTestArrow = document.querySelector('.opr-testimonials__arrow--next');
    let currentTestSlide = 0;
    const totalTestSlides = testSlides.length;

    function updateTestimonialsSlider(index) {
        testSlides.forEach(slide => slide.classList.remove('opr-testimonials__slide--active'));
        testPages.forEach(page => page.classList.remove('opr-testimonials__page--active'));

        if(testSlides[index]) testSlides[index].classList.add('opr-testimonials__slide--active');
        if(testPages[index]) testPages[index].classList.add('opr-testimonials__page--active');
    }

    if (testPages.length > 0) {
        testPages.forEach(page => {
            page.addEventListener('click', (e) => {
                currentTestSlide = parseInt(e.target.getAttribute('data-index'));
                updateTestimonialsSlider(currentTestSlide);
            });
        });

        if(prevTestArrow) {
            prevTestArrow.addEventListener('click', () => {
                currentTestSlide = (currentTestSlide - 1 + totalTestSlides) % totalTestSlides;
                updateTestimonialsSlider(currentTestSlide);
            });
        }
        
        if(nextTestArrow) {
            nextTestArrow.addEventListener('click', () => {
                currentTestSlide = (currentTestSlide + 1) % totalTestSlides;
                updateTestimonialsSlider(currentTestSlide);
            });
        }
    }
/*  */

/* form submission */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
           
            e.preventDefault();


            successMessage.classList.add('opr-contact__success--active');

            contactForm.reset();

            setTimeout(() => {
                successMessage.classList.remove('opr-contact__success--active');
            }, 5000); 
        });
    }
});
/*  */

/* header-scroller */
  document.addEventListener('DOMContentLoaded', () => {
      const header = document.querySelector('.opr-hero__header');
      
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              header.classList.add('opr-hero__header--scrolled');
          } else {
              header.classList.remove('opr-hero__header--scrolled');
          }
      });
  });
/*  */

/* scroll to top */
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 1.5) {
            scrollTopBtn.classList.add('opr-scroll-top--visible');
        } else {
            scrollTopBtn.classList.remove('opr-scroll-top--visible');
        }
    });

    // 2. Smooth scroll back to the top when clicked
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
/*  */