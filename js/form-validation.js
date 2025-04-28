/* Form Validation JavaScript file for Platfolio website */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = nameInput.nextElementSibling.nextElementSibling;
    const emailError = emailInput.nextElementSibling.nextElementSibling;
    const subjectError = subjectInput.nextElementSibling.nextElementSibling;
    const messageError = messageInput.nextElementSibling.nextElementSibling;
    
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      
      resetErrors();
      
      
      let isValid = true;
      
      if (!validateName(nameInput.value)) {
        showError(nameInput, nameError, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
      }
      
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, subjectError, 'Please enter a subject (at least 4 characters)');
        isValid = false;
      }
      
      if (!validateMessage(messageInput.value)) {
        showError(messageInput, messageError, 'Please enter a message (at least 10 characters)');
        isValid = false;
      }
      
      
      if (isValid) {
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
          
          contactForm.reset();
          
          
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
          
          contactForm.appendChild(successMessage);
          
          
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
              successMessage.remove();
            }, 300);
          }, 5000);
        }, 2000);
      }
    });
    
    
    nameInput.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        if (!validateName(this.value)) {
          showError(this, nameError, 'Please enter a valid name (at least 2 characters)');
        } else {
          hideError(this, nameError);
        }
      } else {
        hideError(this, nameError);
      }
    });
    
    emailInput.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        if (!validateEmail(this.value)) {
          showError(this, emailError, 'Please enter a valid email address');
        } else {
          hideError(this, emailError);
        }
      } else {
        hideError(this, emailError);
      }
    });
    
    subjectInput.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        if (!validateSubject(this.value)) {
          showError(this, subjectError, 'Please enter a subject (at least 4 characters)');
        } else {
          hideError(this, subjectError);
        }
      } else {
        hideError(this, subjectError);
      }
    });
    
    messageInput.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        if (!validateMessage(this.value)) {
          showError(this, messageError, 'Please enter a message (at least 10 characters)');
        } else {
          hideError(this, messageError);
        }
      } else {
        hideError(this, messageError);
      }
    });
    
    
    function validateName(name) {
      return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function validateSubject(subject) {
      return subject.trim().length >= 4;
    }
    
    function validateMessage(message) {
      return message.trim().length >= 10;
    }
    
    
    function showError(input, errorElement, message) {
      input.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    function hideError(input, errorElement) {
      input.classList.remove('error');
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    
    function resetErrors() {
      
      const errorElements = contactForm.querySelectorAll('.form-error');
      const inputElements = contactForm.querySelectorAll('input, textarea');
      
      errorElements.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
      });
      
      inputElements.forEach(input => {
        input.classList.remove('error');
      });
    }
    
    
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const label = group.querySelector('label');
      
      
      input.addEventListener('focus', () => {
        label.classList.add('active');
      });
      
      
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          label.classList.remove('active');
        }
      });
      
      
      if (input.value.trim() !== '') {
        label.classList.add('active');
      }
    });
  }
  
  
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        
        
        emailInput.classList.add('shake');
        setTimeout(() => {
          emailInput.classList.remove('shake');
        }, 500);
      } else {
        
        const button = newsletterForm.querySelector('button');
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('success');
        emailInput.classList.add('success');
        
        
        setTimeout(() => {
          newsletterForm.reset();
          button.innerHTML = originalHTML;
          button.classList.remove('success');
          emailInput.classList.remove('success');
        }, 2000);
      }
    });
    
    
    emailInput.addEventListener('input', function() {
      this.classList.remove('error');
    });
    
    
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
});
