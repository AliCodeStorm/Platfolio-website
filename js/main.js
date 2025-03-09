/* Main JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Disable AOS animations to ensure content is visible
  if (typeof AOS !== 'undefined') {
    AOS.init({
      disable: true // Disable all animations
    });
  }

  // Force all elements with AOS attributes to be visible
  document.querySelectorAll('[data-aos]').forEach(element => {
    element.removeAttribute('data-aos');
    element.removeAttribute('data-aos-delay');
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'none';
  });

  // Force display of hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.visibility = 'visible';
  }

  // Force display of social links
  const socialLinks = document.querySelector('.social-links');
  if (socialLinks) {
    socialLinks.style.opacity = '1';
    socialLinks.style.visibility = 'visible';
  }

  // Force display of hero CTA buttons
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.style.opacity = '1';
    heroCta.style.visibility = 'visible';
  }

  // Force display of hero description
  const heroDescription = document.querySelector('.hero-description');
  if (heroDescription) {
    heroDescription.style.opacity = '1';
    heroDescription.style.visibility = 'visible';
  }

  // Ensure all images are properly loaded
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

  // Initialize project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });

  // Make testimonials visible immediately
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  testimonialItems.forEach((item, index) => {
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    item.style.display = 'block';
    
    // Show the first testimonial by default
    if (index === 0) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Initialize testimonial controls
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  
  if (testimonialPrev && testimonialNext && testimonialItems.length > 0) {
    let currentTestimonial = 0;
    
    // Show testimonial function
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
    
    // Initialize with first testimonial visible
    showTestimonial(0);
    
    // Previous button click
    testimonialPrev.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
    
    // Next button click
    testimonialNext.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    });
  }

  // Set light mode as default if no preference is stored
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // Apply saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    // Set initial state based on saved preference
    themeSwitch.checked = localStorage.getItem('theme') === 'dark';
    
    // Add event listener for theme toggle
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        applyDarkMode();
      } else {
        applyLightMode();
      }
    });
  }

  // Function to apply dark mode
  function applyDarkMode() {
    document.body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (themeSwitch) themeSwitch.checked = true;
  }

  // Function to apply light mode
  function applyLightMode() {
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (themeSwitch) themeSwitch.checked = false;
  }

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

  // Disable animations on mobile devices for better performance
  if (window.innerWidth < 768) {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  }
});
