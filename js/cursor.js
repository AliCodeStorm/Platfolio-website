/* Cursor Animation JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Custom cursor animation
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Check if it's a touch device
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  };
  
  // Only initialize cursor if not a touch device and elements exist
  if (cursorDot && cursorOutline && !isTouchDevice()) {
    // Initial setup
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Speed and easing
    const dotSpeed = 1;
    const outlineSpeed = 0.2;
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animate cursor with requestAnimationFrame for smooth movement
    function animateCursor() {
      // Calculate distance between current position and target (mouse) position
      const dotDistanceX = mouseX - dotX;
      const dotDistanceY = mouseY - dotY;
      const outlineDistanceX = mouseX - outlineX;
      const outlineDistanceY = mouseY - outlineY;
      
      // Update positions with easing
      dotX += dotDistanceX * dotSpeed;
      dotY += dotDistanceY * dotSpeed;
      outlineX += outlineDistanceX * outlineSpeed;
      outlineY += outlineDistanceY * outlineSpeed;
      
      // Apply new positions
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      
      // Continue animation loop
      requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    
    // Cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .social-link, .filter-btn');
    
    interactiveElements.forEach(element => {
      // Expand cursor on hover
      element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
        cursorOutline.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
        cursorOutline.style.border = 'none';
      });
      
      // Return cursor to normal on mouse leave
      element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.border = '2px solid var(--primary-color)';
      });
      
      // Add active state on mouse down
      element.addEventListener('mousedown', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(0.9)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(0.9)`;
      });
      
      // Remove active state on mouse up
      element.addEventListener('mouseup', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
      });
    });
    
    // Special effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursorDot.style.backgroundColor = 'var(--secondary-color)';
        cursorOutline.style.borderColor = 'var(--secondary-color)';
      });
      
      card.addEventListener('mouseleave', () => {
        cursorDot.style.backgroundColor = 'var(--primary-color)';
        cursorOutline.style.borderColor = 'var(--primary-color)';
      });
    });
    
    // Special effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        cursorDot.style.backgroundColor = '#fff';
      });
      
      button.addEventListener('mouseleave', () => {
        cursorDot.style.backgroundColor = 'var(--primary-color)';
      });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
  } else if (cursorDot && cursorOutline) {
    // Hide custom cursor on touch devices
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
  }
});
