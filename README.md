# Platfolio - Animated Portfolio Website

A fully responsive animated portfolio website built with HTML, CSS, and JavaScript. This website showcases modern web design techniques, smooth animations, and interactive elements to create an engaging user experience.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Entrance animations, scroll animations, and hover effects
- **Custom Cursor**: Interactive custom cursor that changes based on the element being hovered
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Project Showcase**: Interactive project cards with flip animation
- **Form Validation**: Contact form with animated validation and feedback
- **Parallax Effects**: Background parallax scrolling for a dynamic look
- **Typing Effect**: Animated typewriter effect in the hero section
- **Testimonial Slider**: Showcase client testimonials with a custom slider
- **Smooth Scrolling**: Enhanced navigation with smooth scrolling to sections

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive features and animations
- **GSAP**: Advanced animations and scroll triggers
- **AOS**: Animate On Scroll library for scroll-based animations
- **Typed.js**: For the typewriter effect
- **Font Awesome**: For icons

## Project Structure

```
platfolio/
├── index.html
├── styles/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── cursor.js
│   └── form-validation.js
└── assets/
    └── images/
        ├── projects/
        └── testimonials/
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Explore the website and its features

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` section of `styles/main.css`:

```css
:root {
  --primary-color: #6c63ff;
  --secondary-color: #f50057;
  --dark-color: #2a2a2a;
  --light-color: #ffffff;
  /* other variables */
}
```

### Adding Projects

To add a new project, copy the project card structure in the HTML and update the content:

```html
<div class="project-card" data-category="your-category">
  <div class="project-card-inner">
    <!-- Front of card -->
    <div class="project-card-front">
      <img src="path/to/image.jpg" alt="Project Name">
      <div class="project-overlay">
        <div class="project-category">Category</div>
        <h3 class="project-title">Project Name</h3>
      </div>
    </div>
    <!-- Back of card -->
    <div class="project-card-back">
      <h3>Project Name</h3>
      <p>Project description goes here.</p>
      <div class="project-tech">
        <span>Tech 1</span>
        <span>Tech 2</span>
      </div>
      <div class="project-links">
        <a href="#" class="btn btn-sm">View Project</a>
        <a href="#" class="btn btn-sm btn-outline">Source Code</a>
      </div>
    </div>
  </div>
</div>
```

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for stock images
- GSAP for animation capabilities
- AOS library for scroll animations
- Typed.js for the typing effect 