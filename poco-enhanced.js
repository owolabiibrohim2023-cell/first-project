// ============================================================
// POCO - Enhanced JavaScript for Animations & Interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallaxEffect();
  initStickyHeader();
  initCountdown();
  initButtonAnimations();
  initSmoothScroll();
  initMobileMenu();
  initLazyLoading();
});

// ============================================================
// SCROLL ANIMATIONS - Fade in elements as they come into view
// ============================================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all product cards, sections, and text elements
  document.querySelectorAll('.whole, .white, .plain, .section-text, .texture').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });

  // Stagger animation for multiple elements
  const cardContainers = document.querySelectorAll('.all, .divs-top, .grid');
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.whole, .white, .plain');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  });
}

// ============================================================
// PARALLAX SCROLLING - Moving background images
// ============================================================
function initParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero section parallax
    const heroSection = document.querySelector('.first');
    if (heroSection) {
      heroSection.style.backgroundPosition = `188vh ${scrolled * 0.5}px`;
    }

    // Floating elements
    const heroImage = document.querySelector('.image');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    const chilli = document.querySelector('.chilli');
    if (chilli) {
      chilli.style.transform = `translateY(${scrolled * -0.2}px) rotateZ(${scrolled * 0.1}deg)`;
    }

    const pizza = document.querySelector('.pizza');
    if (pizza) {
      pizza.style.transform = `translateY(${scrolled * -0.15}px) scale(${1 + scrolled * 0.0001})`;
    }
  });
}

// ============================================================
// STICKY HEADER - Smooth header transition on scroll
// ============================================================
function initStickyHeader() {
  const header3 = document.querySelector('.header3');
  let lastScrollTop = 0;
  let scrollDirection = 'down';

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }

    if (header3) {
      if (scrollDirection === 'down' && scrollTop > 100) {
        header3.classList.add('header-hidden');
      } else {
        header3.classList.remove('header-hidden');
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ============================================================
// COUNTDOWN TIMER - Special offer countdown
// ============================================================
function initCountdown() {
  const countdownNumbers = document.querySelectorAll('.no');
  if (countdownNumbers.length === 0) return;

  // Set countdown to 24 hours from now
  const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft < 0) {
      document.querySelectorAll('.no').forEach(el => el.textContent = '00');
      return;
    }

    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((timeLeft % (60 * 1000)) / 1000);

    const numbers = [days, hours, mins, secs];
    countdownNumbers.forEach((el, index) => {
      const newVal = String(numbers[index]).padStart(2, '0');
      if (el.textContent !== newVal) {
        el.classList.remove('countdown-pulse');
        void el.offsetWidth; // Trigger reflow
        el.classList.add('countdown-pulse');
      }
      el.textContent = newVal;
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================================
// BUTTON ANIMATIONS - Click ripple effect
// ============================================================
function initButtonAnimations() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    // Add hover scale effect
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// ============================================================
// SMOOTH SCROLL - Smooth scrolling for links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================================
// MOBILE MENU - Responsive navigation toggle
// ============================================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.link');
  const header3 = document.querySelector('.header3');

  if (menuToggle && navMenu && header3) {
    menuToggle.addEventListener('click', () => {
      header3.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        header3.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// ============================================================
// LAZY LOADING - Images load as they come into view
// ============================================================
function initLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('✨ POCO Enhanced - All animations loaded!');

// display 
function display1(){
const grid1 = document.getElementById("grid-1")
grid1.style.display="grid"
grid1.style.grid="130px 130px 130px"

}

function display2(){
const grid2 = document.getElementById("grid-2")
const grid1 = document.getElementById("grid-1")
grid2.style.display="grid"
grid1.style.display="none"



}
function display3(){
  const grid2 = document.getElementById("grid-2")
const grid1 = document.getElementById("grid-1")
const grid3 = document.getElementById("grid-3")
grid3.style.display="grid"
grid2.style.display="none"
grid1.style.display="none"

}
