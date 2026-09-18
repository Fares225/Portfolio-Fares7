/**
 * FARES AYMAN - MODERN DEVELOPER PORTFOLIO JAVASCRIPT
 * Handles navigation, interactive project modal, WhatsApp messaging, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');
  
  // Project Modal Elements
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechs = document.getElementById('modalTechs');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalActionBtn = document.getElementById('modalActionBtn');

  // Contact Form
  const quickContactForm = document.getElementById('quickContactForm');

  // --------------------------------------------------------------------------
  // Project Details Database
  // --------------------------------------------------------------------------
  const projectsData = {
    'project-1': {
      badge: 'Project 01 • Mobile Application',
      title: 'Mobile Application',
      desc: 'A mobile application project focused on creating a modern, intuitive, and easy-to-use user experience. Designed with clean architecture, fluid screen transitions, and performance optimization.',
      techs: ['Mobile App Development', 'UI/UX Design', 'Cross-Platform', 'Clean Architecture'],
      features: [
        'User-centric navigation and clean interface hierarchy',
        'Fluid gestures and responsive component layouts',
        'Optimized state management and lightweight asset loading',
        'Cross-device compatibility across various screen aspect ratios'
      ],
      whatsappPrompt: 'Hi Fares! I saw your Mobile Application project on your portfolio and I would like to discuss a mobile project with you.'
    },
    'project-2': {
      badge: 'Project 02 • Responsive Website',
      title: 'Responsive Website',
      desc: 'A responsive website designed to provide a clean and modern experience across different devices. Features modern CSS grid/flexbox layouts, responsive typography, and accessibility best practices.',
      techs: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Accessibility'],
      features: [
        '100% fluid layouts adapting from mobile screens to ultra-wide displays',
        'Semantic HTML5 structure optimized for SEO and readability',
        'Clean CSS architecture with custom variables and glassmorphic styling',
        'Fast loading speeds with zero external framework overhead'
      ],
      whatsappPrompt: 'Hi Fares! I am interested in building a Responsive Website similar to Project 02 on your portfolio.'
    },
    'project-3': {
      badge: 'Project 03 • Interactive Web Project',
      title: 'Interactive Web Project',
      desc: 'An interactive web project using JavaScript to create dynamic and engaging features. Implements real-time DOM interactions, animated states, and interactive user controls.',
      techs: ['HTML', 'CSS', 'JavaScript', 'Dynamic DOM', 'Micro-Animations'],
      features: [
        'Dynamic user interactions powered by vanilla modern JavaScript (ES6+)',
        'Engaging UI transitions and real-time visual feedback',
        'Modular, maintainable script organization and event handling',
        'Smooth micro-animations that elevate user delight'
      ],
      whatsappPrompt: 'Hi Fares! I would love to build an Interactive Web Project with you like Project 03.'
    }
  };

  // --------------------------------------------------------------------------
  // Navbar Scroll Effects & Active Link Spy
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky background toggle
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Section Spy
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // Mobile Navigation Drawer Toggle
  // --------------------------------------------------------------------------
  if (mobileToggle && mobileDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // Back To Top Button
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // Project Modal Handling
  // --------------------------------------------------------------------------
  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Render Tech tags
    modalTechs.innerHTML = data.techs
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');

    // Render Features
    modalFeatures.innerHTML = data.features
      .map(feat => `
        <div class="modal-feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--cyan-400); flex-shrink: 0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${feat}</span>
        </div>
      `)
      .join('');

    // WhatsApp Action for this project
    const waUrl = `https://wa.me/2010406060311?text=${encodeURIComponent(data.whatsappPrompt)}`;
    modalActionBtn.setAttribute('href', waUrl);

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-project-trigger]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-project-trigger');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // Interactive WhatsApp Quick-Message Form
  // --------------------------------------------------------------------------
  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contactName');
      const serviceSelect = document.getElementById('contactService');
      const messageTextarea = document.getElementById('contactMessage');

      const name = nameInput.value.trim() || 'Client';
      const service = serviceSelect.value || 'General Inquiry';
      const message = messageTextarea.value.trim() || 'Hello Fares, I would like to discuss a project with you.';

      const formattedText = `👋 Hello Fares!\n\nMy Name: ${name}\nProject Interest: ${service}\nMessage: ${message}`;
      const waUrl = `https://wa.me/2010406060311?text=${encodeURIComponent(formattedText)}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --------------------------------------------------------------------------
  // Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  }
});
