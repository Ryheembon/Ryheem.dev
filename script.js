document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', () => {
    const dropdownContent = button.nextElementSibling;
    const isOpen = dropdownContent.classList.contains('open');

    document.querySelectorAll('.dropdown-content').forEach(content => {
      content.classList.remove('open');
      content.style.maxHeight = null;
    });

    if (!isOpen) {
      dropdownContent.classList.add('open');
      dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Navigation functionality
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Handle scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Handle mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Toggle menu icon
  const icon = mobileMenuBtn.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking
      navLinks.classList.remove('active');
    }
  });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
  if (animated) return;
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCount = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCount();
  });
  
  animated = true;
};

// Observe stats section
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statsObserver.observe(statsSection);
}

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    
    if (!name.value || !email.value || !message.value) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // If validation passes, submit the form
    contactForm.submit();
  });
}

// Toggle article function
function toggleArticle() {
  const articleContent = document.getElementById('article-content');
  const expandIcon = document.querySelector('.expand-icon');
  const expandText = document.querySelector('.expand-text');
  
  if (articleContent.classList.contains('expanded')) {
    // Collapse
    articleContent.classList.remove('expanded');
    expandIcon.classList.remove('rotated');
    expandText.textContent = 'Click to read more';
  } else {
    // Expand
    articleContent.classList.add('expanded');
    expandIcon.classList.add('rotated');
    expandText.textContent = 'Click to collapse';
  }
}

// Project demo function
function showProjectDemo() {
  // Create a cool modal effect
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>AI Resume Analyzer Demo</h3>
        <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="demo-placeholder">
          <i class="fas fa-robot"></i>
          <h4>Interactive Demo Coming Soon!</h4>
          <p>This will showcase the AI Resume Analyzer in action</p>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add entrance animation
  setTimeout(() => modal.classList.add('show'), 10);
}

// Timeline reveal animations
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, index * 200);
      }
    });
  }, { threshold: 0.3 });
  
  timelineItems.forEach(item => timelineObserver.observe(item));
}

// Value cards floating animation
function initFloatingCards() {
  const valueCards = document.querySelectorAll('.value-card');
  
  valueCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
  });
}

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  initTimelineAnimations();
  initFloatingCards();
});

// Add ripple effect to buttons
document.querySelectorAll('.primary-btn, .secondary-btn, .submit-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});