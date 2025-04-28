/* Cursor Animation JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  };
  
  
  if (cursorDot && cursorOutline && !isTouchDevice()) {
    
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    
    const dotSpeed = 1;
    const outlineSpeed = 0.2;
    
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    
    function animateCursor() {
      
      const dotDistanceX = mouseX - dotX;
      const dotDistanceY = mouseY - dotY;
      const outlineDistanceX = mouseX - outlineX;
      const outlineDistanceY = mouseY - outlineY;
      
      
      dotX += dotDistanceX * dotSpeed;
      dotY += dotDistanceY * dotSpeed;
      outlineX += outlineDistanceX * outlineSpeed;
      outlineY += outlineDistanceY * outlineSpeed;
      
      
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      
      
      requestAnimationFrame(animateCursor);
    }
    
    
    animateCursor();
    
    
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
    
    
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    
    
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .social-link, .filter-btn');
    
    interactiveElements.forEach(element => {
      
      element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
        cursorOutline.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
        cursorOutline.style.border = 'none';
      });
      
      
      element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.border = '2px solid var(--primary-color)';
      });
      
      
      element.addEventListener('mousedown', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(0.9)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(0.9)`;
      });
      
      
      element.addEventListener('mouseup', () => {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
      });
    });
    
    
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
    
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        cursorDot.style.backgroundColor = '#fff';
      });
      
      button.addEventListener('mouseleave', () => {
        cursorDot.style.backgroundColor = 'var(--primary-color)';
      });
    });
    
    
    document.body.style.cursor = 'none';
  } else if (cursorDot && cursorOutline) {
    
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
  }
});
