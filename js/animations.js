/* Animations JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // GSAP Animations
  
  // Hero Section Animations
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  heroTimeline
    .from('.hero-title .greeting', { y: 50, opacity: 0, duration: 1 })
    .from('.hero-title .name', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
    .from('.hero-subtitle', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
    .from('.hero-description', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
    .from('.hero-cta', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
    .from('.social-links', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
    .from('.scroll-down', { y: -20, opacity: 0, duration: 1 }, '-=0.5');
  
  // Typing Effect
  if (document.querySelector('.typing-effect')) {
    const options = {
      strings: ['Web Developer', 'MERN Stack Learner', 'Frontend Developer', 'Content Creator'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    };
    
    new Typed('.typing-effect', options);
  }
  
  // Scroll Animations
  
  // About Section
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.about-image', { 
        x: -100, 
        opacity: 0, 
        duration: 1, 
        ease: 'power3.out' 
      });
      
      gsap.from('.about-text', { 
        x: 100, 
        opacity: 0, 
        duration: 1, 
        ease: 'power3.out' 
      });
    },
    once: true
  });
  
  // Skills Section
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.skills-category', { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.3, 
        ease: 'power3.out' 
      });
    },
    once: true
  });
  
  // Projects Section
  ScrollTrigger.create({
    trigger: '#projects',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.project-card', { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: 'power3.out' 
      });
    },
    once: true
  });
  
  // Contact Section
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.contact-info', { 
        x: -100, 
        opacity: 0, 
        duration: 1, 
        ease: 'power3.out' 
      });
      
      gsap.from('.contact-form', { 
        x: 100, 
        opacity: 0, 
        duration: 1, 
        ease: 'power3.out' 
      });
    },
    once: true
  });
  
  // Background Parallax Effect
  const animatedBackground = document.querySelector('.animated-background');
  const bgShapes = document.querySelectorAll('.bg-shape');
  const floatingElements = document.querySelectorAll('.floating-element');
  
  if (animatedBackground) {
    // Mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      bgShapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.01);
        const x = (mouseX * speed * 100) - (speed * 50);
        const y = (mouseY * speed * 100) - (speed * 50);
        
        shape.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      });
      
      floatingElements.forEach((element, index) => {
        const speed = 0.02 + (index * 0.005);
        const x = (mouseX * speed * 100) - (speed * 50);
        const y = (mouseY * speed * 100) - (speed * 50);
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
    
    // Scroll parallax effect
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      
      bgShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
    
    // Random size and opacity for floating elements
    floatingElements.forEach((element) => {
      const size = Math.random() * 10 + 5; // Random size between 5px and 15px
      const opacity = Math.random() * 0.3 + 0.1; // Random opacity between 0.1 and 0.4
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.opacity = opacity;
    });
  }
  
  // Animate on hover for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        y: -10, 
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)', 
        duration: 0.3 
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        y: 0, 
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', 
        duration: 0.3 
      });
    });
  });
  
  // Animate section titles when they come into view
  const sectionTitles = document.querySelectorAll('.section-title');
  
  sectionTitles.forEach(title => {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(title, { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        });
        
        gsap.from(title.nextElementSibling, { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          delay: 0.2, 
          ease: 'power3.out' 
        });
      },
      once: true
    });
  });
  
  // Animate progress bars in skills section
  const progressBars = document.querySelectorAll('.progress-bar');
  
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 80%',
    onEnter: () => {
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, { 
          width: width, 
          duration: 1.5, 
          ease: 'power3.out' 
        });
      });
    },
    once: true
  });
});
