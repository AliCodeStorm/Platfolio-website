/* Main JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  
  if (typeof AOS !== 'undefined') {
    AOS.init({
      disable: true 
    });
  }

  
  document.querySelectorAll('[data-aos]').forEach(element => {
    element.removeAttribute('data-aos');
    element.removeAttribute('data-aos-delay');
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'none';
  });

  
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.visibility = 'visible';
  }

  
  const socialLinks = document.querySelector('.social-links');
  if (socialLinks) {
    socialLinks.style.opacity = '1';
    socialLinks.style.visibility = 'visible';
  }

  
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.style.opacity = '1';
    heroCta.style.visibility = 'visible';
  }

  
  const heroDescription = document.querySelector('.hero-description');
  if (heroDescription) {
    heroDescription.style.opacity = '1';
    heroDescription.style.visibility = 'visible';
  }

  
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      if (this.parentNode.classList.contains('image-placeholder')) {
        this.parentNode.classList.add('no-image');
      }
      if (this.parentNode.classList.contains('project-image-placeholder')) {
        this.parentNode.classList.add('no-image');
      }
    });
  });

  
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });

  
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  testimonialItems.forEach((item, index) => {
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    item.style.display = 'block';
    
    
    if (index === 0) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  
  if (testimonialPrev && testimonialNext && testimonialItems.length > 0) {
    let currentTestimonial = 0;
    
    
    function showTestimonial(index) {
      testimonialItems.forEach((item, i) => {
        if (i === index) {
          item.style.opacity = '1';
          item.style.display = 'block';
          item.classList.add('active');
        } else {
          item.style.opacity = '0';
          item.style.display = 'none';
          item.classList.remove('active');
        }
      });
    }
    
    
    showTestimonial(0);
    
    
    testimonialPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
    
    
    testimonialNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
  }

  
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    
    themeSwitch.checked = localStorage.getItem('theme') === 'dark';
    
    
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        applyDarkMode();
      } else {
        applyLightMode();
      }
    });
  }

  
  function applyDarkMode() {
    document.body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (themeSwitch) themeSwitch.checked = true;
  }

  
  function applyLightMode() {
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (themeSwitch) themeSwitch.checked = false;
  }

  
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  
  const header = document.querySelector('.header');
  const scrollThreshold = 50; 

  function toggleHeaderClass() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  
  toggleHeaderClass();
  window.addEventListener('scroll', toggleHeaderClass);

  
  const body = document.body;

  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
    
    
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    
    
    if (navOverlay) {
      navOverlay.addEventListener('click', toggleMenu);
    }

    
    navLinksItems.forEach(item => {
      item.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
    
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
    
    
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991 && hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + header.offsetHeight + 20;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        });
        navLink.classList.add('active');
        navLink.setAttribute('aria-current', 'page');
      }
    });
  }

  
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  
  const backToTopButton = document.querySelector('.back-to-top');
  
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTopButton);
  toggleBackToTopButton(); 

  
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  }

  
  animateProgressBars();
  
  const skillsSection = document.querySelector('#skills');
  
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
  }

  
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      
      projectCards.forEach(card => {
        
        card.style.transition = 'all 0.4s ease';
        
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400); 
        }
      });
    });
  });

  
  if (window.innerWidth < 768) {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  }
});
