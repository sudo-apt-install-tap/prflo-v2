// ========================================
// CUSTOM CURSOR FUNCTIONALITY
// ========================================

const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Update dot position
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';

  // Smooth follower movement
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .work-card, .service-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });

  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// ========================================
// WORK SECTION DATA & RENDERING
// ========================================

const workData = [
  {
    title: 'Keyboard PCB Designer',
    description: 'Interactive tool for designing custom mechanical keyboard PCBs with real-time preview and export capabilities.',
    tags: ['Electronics', 'CAD', 'JavaScript']
  },
  {
    title: 'Hardware Portfolio',
    description: 'Showcase of custom electronics projects including macropads, microcontrollers, and audio interfaces.',
    tags: ['Hardware', 'Embedded', 'Design']
  },
  {
    title: 'Motion Graphics Platform',
    description: 'Web-based animation studio with real-time rendering and collaborative features for creative teams.',
    tags: ['Animation', 'Web', 'React']
  }
];

const workGrid = document.getElementById('work-grid');

workData.forEach((project, index) => {
  const card = document.createElement('div');
  card.className = 'work-card';
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="work-tags">
      ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
  `;
  workGrid.appendChild(card);
});

// ========================================
// SERVICES SECTION DATA & RENDERING
// ========================================

const servicesData = [
  {
    icon: '🎨',
    title: 'Design',
    description: 'Crafting beautiful and intuitive user interfaces with attention to detail.'
  },
  {
    icon: '💻',
    title: 'Development',
    description: 'Building fast, scalable, and maintainable web applications.'
  },
  {
    icon: '⚡',
    title: 'Optimization',
    description: 'Maximizing performance and ensuring smooth user experiences.'
  },
  {
    icon: '🔐',
    title: 'Security',
    description: 'Implementing best practices to keep your applications safe.'
  }
];

const servicesGrid = document.getElementById('services-grid');

servicesData.forEach((service) => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `
    <div class="service-icon">${service.icon}</div>
    <h3>${service.title}</h3>
    <p>${service.description}</p>
  `;
  servicesGrid.appendChild(card);
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target) {
  let current = 0;
  const increment = Math.ceil(target / 50);
  
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = current;
  }, 30);
}

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-count'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ========================================
// FORM HANDLING
// ========================================

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]');
    
    // Simple validation and feedback
    if (email.value) {
      alert(`✨ Thanks for subscribing with ${email.value}!`);
      email.value = '';
    }
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, textarea');
    const formData = {
      name: inputs[0].value,
      email: inputs[1].value,
      message: inputs[2].value
    };
    
    if (formData.name && formData.email && formData.message) {
      alert('✨ Thank you for reaching out! We\'ll get back to you soon.');
      contactForm.reset();
    }
  });
}

// ========================================
// SMOOTH SCROLL & NAVIGATION
// ========================================

document.querySelectorAll('a[data-nav]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    const element = document.querySelector(target);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================================
// HAMBURGER MENU (Mobile)
// ========================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `${entry.target.getAttribute('data-animation') || 'fadeInUp'} 0.8s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ========================================
// PAGE LOAD EFFECTS
// ========================================

window.addEventListener('load', () => {
  // Add staggered animation to cards
  const cards = document.querySelectorAll('.work-card, .service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    setTimeout(() => {
      card.style.opacity = '1';
    }, index * 100);
  });
});

// ========================================
// PARTICLE EFFECT (Optional Enhancement)
// ========================================

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = '10px';
  particle.style.height = '10px';
  particle.style.background = 'var(--ctp-mauve)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9997';
  particle.style.boxShadow = '0 0 10px var(--ctp-mauve)';
  particle.style.opacity = '1';
  particle.style.animation = `particle-fade 0.8s ease-out forwards`;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 800);
}

// Add particle effect to buttons on click
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createParticle(x, y);
      }, i * 50);
    }
  });
});

// Add particle fade animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particle-fade {
    to {
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// SCROLL INDICATOR
// ========================================

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  // Could be used to show scroll progress if needed
  // console.log('Scroll progress:', scrollPercent);
});

// ========================================
// THEME DETECTION (Light/Dark Mode)
// ========================================

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c✨ Welcome to TechStudio Portfolio! ✨', 'color: #c6a0f6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with vanilla HTML, CSS & JavaScript', 'color: #8bd5ca; font-size: 14px;');
console.log('%cFeel free to explore the code and customize it for your needs!', 'color: #f5bde6; font-size: 12px;');