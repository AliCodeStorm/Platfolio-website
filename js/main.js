/* Main JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: false,
    disable: 'mobile', // Disable on mobile for better performance
    startEvent: 'DOMContentLoaded'
  });

  // Make sure all content is visible regardless of AOS
  setTimeout(function() {
    document.querySelectorAll('[data-aos]').forEach(element => {
      element.classList.add('aos-animate');
    });
  }, 500);

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Sticky Header
  const header = document.querySelector('.header');
  const scrollThreshold = 50; // Lower threshold for quicker sticky behavior

  function toggleHeaderClass() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  // Apply sticky class on page load if needed
  toggleHeaderClass();
  window.addEventListener('scroll', toggleHeaderClass);

  // Get body element once for all functions
  const body = document.body;

  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
    
    // Update ARIA attributes
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  // Initialize hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking on the overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
      item.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
    
    // Close mobile menu on resize if window becomes larger than tablet size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991 && hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // Active navigation link based on scroll position
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

  // Update active nav link on page load and scroll
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);

  // Smooth scrolling for internal links
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

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTopButton);
  toggleBackToTopButton(); // Initial check

  // Skills progress bars animation
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  }

  // Trigger progress bar animation immediately and when skills section is in view
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

  // Project filtering with animation
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Initialize projects - make sure all are visible initially
  projectCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects with animation
      projectCards.forEach(card => {
        // Add transition for smooth animation
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
          }, 400); // Match the transition duration
        }
      });
    });
  });

  // Testimonial slider with improved functionality
  let currentTestimonial = 0;
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  
  function showTestimonial(index) {
    // Hide all testimonials with fade out
    testimonialItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    });
    
    // Show the current testimonial with fade in
    setTimeout(() => {
      testimonialItems[index].style.display = 'block';
      setTimeout(() => {
        testimonialItems[index].style.opacity = '1';
        testimonialItems[index].style.transform = 'scale(1)';
      }, 50);
    }, 300);
  }
  
  if (testimonialItems.length > 0) {
    // Add transition to all testimonial items
    testimonialItems.forEach(item => {
      item.style.transition = 'all 0.3s ease';
      item.style.opacity = '0';
      item.style.display = 'none';
    });
    
    // Show the first testimonial
    showTestimonial(currentTestimonial);
    
    // Next button click
    testimonialNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
    
    // Previous button click
    testimonialPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    });
  }

  // Dark/Light mode toggle
  const themeSwitch = document.querySelector('#theme-switch');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to apply dark mode
  function applyDarkMode() {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Function to apply light mode
  function applyLightMode() {
    body.classList.remove('dark-mode');
    themeSwitch.checked = false;
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  // Apply theme based on saved preference or system preference
  if (savedTheme === 'dark') {
    applyDarkMode();
  } else if (savedTheme === 'light') {
    applyLightMode();
  } else if (prefersDarkScheme.matches) {
    applyDarkMode();
  } else {
    applyLightMode();
  }
  
  // Toggle theme when switch is clicked
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  });
  
  // Listen for changes in system color scheme preference
  prefersDarkScheme.addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        applyDarkMode();
      } else {
        applyLightMode();
      }
    }
  });
  
  // Disable animations on mobile devices for better performance
  if (window.innerWidth < 768) {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  }
});
