/* ==========================================================================
   RK TRADERS STATIONERY WEBSITE - INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProducts();
  initScrollEffects();
  initContactForm();
});

/* ==========================================================================
   THEME MANAGER (LIGHT/DARK MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  mobileToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isActive);
    
    // Toggle mobile icon style between hamburger and close cross
    if (isActive) {
      hamburgerIcon.innerHTML = `<path d="M6 18L18 6M6 6l12 12" />`;
    } else {
      hamburgerIcon.innerHTML = `<path d="M4 6h16M4 12h16M4 18h16" />`;
    }
  });

  // Close menu drawer when clicking on any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        hamburgerIcon.innerHTML = `<path d="M4 6h16M4 12h16M4 18h16" />`;
      }
    });
  });
}

/* ==========================================================================
   PRODUCTS CATALOG LOGIC (FILTER & SEARCH)
   ========================================================================== */
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Classmate A4 Notebook (200 Pages)",
    category: "notebooks",
    price: "₹65",
    description: "Premium single-line notebook with smooth paper. Perfect for college lectures and record maintenance.",
    tag: "Bestseller"
  },
  {
    id: 2,
    name: "Parker Vector Matte Black Ball Pen",
    category: "writing",
    price: "₹250",
    description: "Elegant professional pen with a smooth ink flow. Includes executive presentation case.",
    tag: "Premium"
  },
  {
    id: 3,
    name: "Casio fx-991EX ClassWiz Calculator",
    category: "electronics",
    price: "₹1,495",
    description: "Advanced scientific calculator featuring 552 functions. Essential for engineering and science majors.",
    tag: "Essential"
  },
  {
    id: 4,
    name: "Omega Mini Drafter (Professional Grade)",
    category: "engineering",
    price: "₹450",
    description: "Premium mechanical mini-drafter with horizontal and vertical scales. Highly durable rods and clamps.",
    tag: "TKM Special"
  },
  {
    id: 5,
    name: "Faber-Castell Artist Brush Pens (12 Colors)",
    category: "art",
    price: "₹380",
    description: "Flexible brush tips for fine sketching, calligraphy, and watercolor effects. Vibrant ink shades.",
    tag: "Art Special"
  },
  {
    id: 6,
    name: "Solo A4 Ring Binder File",
    category: "office",
    price: "₹120",
    description: "Heavy-duty ring binder file for reports, project paperwork, and office document archiving.",
    tag: "Office"
  },
  {
    id: 7,
    name: "80cm Hardwood T-Square Ruler",
    category: "engineering",
    price: "₹320",
    description: "Polished wood architectural T-square with transparent acrylic edges for clean draft lines.",
    tag: "Architecture"
  },
  {
    id: 8,
    name: "Camel Acrylic Colors (12 Shades Set)",
    category: "art",
    price: "₹280",
    description: "Rich, fast-drying pigment paint. Perfect for canvases, craft projects, and exhibition charts.",
    tag: "Creative"
  },
  {
    id: 9,
    name: "Casio fx-82MS Scientific Calculator",
    category: "electronics",
    price: "₹695",
    description: "Standard 240-function 2-line scientific calculator. Approved for board examinations and school tests.",
    tag: "Student Fav"
  },
  {
    id: 10,
    name: "Solo Transparent Project Report Files (5 Pack)",
    category: "office",
    price: "₹90",
    description: "Clear report covers with color sidebars. Ideal for engineering, architecture, or school project reports.",
    tag: "Bulk Deal"
  },
  {
    id: 11,
    name: "Skybags Collegiate Backpack (32L)",
    category: "school",
    price: "₹1,299",
    description: "High-grade polyester backpack with 3 large compartments and a dedicated water bottle mesh pocket.",
    tag: "New In"
  },
  {
    id: 12,
    name: "Cello H2O Stainless Steel Water Bottle (1L)",
    category: "school",
    price: "₹290",
    description: "Ergonomic leak-proof, food-grade stainless steel bottle to keep your drinks cool in the Kerala heat.",
    tag: "Essential"
  },
  {
    id: 13,
    name: "Classmate Practical Record Book",
    category: "notebooks",
    price: "₹85",
    description: "Prescribed A4 size record book with alternate ruled and plain sheets for lab sketches and tables.",
    tag: "Bestseller"
  },
  {
    id: 14,
    name: "Rotring Isograph Technical Pen (0.3mm)",
    category: "engineering",
    price: "₹1,850",
    description: "High-precision chrome-plated architectural drawing pen. Refillable ink system for professional drafts.",
    tag: "Architecture"
  },
  {
    id: 15,
    name: "Staedtler Precision Geometry Compass Set",
    category: "writing",
    price: "₹550",
    description: "Solid metal quick-adjust compass with spare lead parts, dividers, and ruler scales in a hard travel case.",
    tag: "Premium"
  }
];

// SVG Icon templates based on category to keep load speeds extremely high
const CATEGORY_ICONS = {
  notebooks: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="8" y1="10" x2="16" y2="10"></line>
      <line x1="8" y1="14" x2="14" y2="14"></line>
    </svg>
  `,
  writing: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  `,
  electronics: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="16" y1="14" x2="16" y2="18"></line>
      <circle cx="8" cy="12" r="1"></circle>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="16" cy="12" r="1"></circle>
      <circle cx="8" cy="16" r="1"></circle>
      <circle cx="12" cy="16" r="1"></circle>
      <circle cx="8" cy="20" r="1"></circle>
      <circle cx="12" cy="20" r="1"></circle>
    </svg>
  `,
  engineering: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 10v6M2 10v6M12 2v6M12 16v6M5 12h14"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,
  art: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 9.5 20 6.5 17 5.5C14 4.5 13 2 10 2C4.47715 2 0 6.47715 0 12C0 17.5228 4.47715 22 10 22H12Z"></path>
      <circle cx="6" cy="10" r="2" fill="currentColor"></circle>
      <circle cx="10" cy="7" r="2" fill="currentColor"></circle>
      <circle cx="14" cy="10" r="2" fill="currentColor"></circle>
    </svg>
  `,
  office: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  `,
  school: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="8" width="14" height="14" rx="2"></rect>
      <path d="M9 8V5a3 3 0 0 1 6 0v3"></path>
      <path d="M5 12h14"></path>
    </svg>
  `
};

function initProducts() {
  const grid = document.getElementById('products-grid');
  const searchInput = document.getElementById('catalog-search');
  const filterPills = document.querySelectorAll('#catalog-filters .filter-pill');
  const emptyState = document.getElementById('catalog-empty');

  let activeCategory = 'all';
  let searchQuery = '';

  // Render initial list
  render();

  // Search input listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    render();
  });

  // Filter category pills listener
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Toggle active classes
      filterPills.forEach(btn => btn.classList.remove('active'));
      pill.classList.add('active');

      activeCategory = pill.getAttribute('data-category');
      render();
    });
  });

  // Exposed global filtering function for footer links
  window.filterCategory = function(categoryName) {
    const targetPill = document.querySelector(`#catalog-filters .filter-pill[data-category="${categoryName}"]`);
    if (targetPill) {
      targetPill.click();
    }
  };

  function render() {
    // Filter products
    const filtered = PRODUCTS_DATA.filter(prod => {
      const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery) || 
                            prod.description.toLowerCase().includes(searchQuery) ||
                            prod.category.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    // Clear old layout but retain empty state template
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach(card => card.remove());

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';

      filtered.forEach(prod => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-id', prod.id);

        const badgeHTML = prod.tag ? `<span class="product-tag">${prod.tag}</span>` : '';
        const iconSVG = CATEGORY_ICONS[prod.category] || CATEGORY_ICONS['office'];

        card.innerHTML = `
          <div class="product-image-container">
            ${badgeHTML}
            <div class="product-image" style="color: var(--primary-color); width: 60px; height: 60px;">
              ${iconSVG}
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">${prod.category}</span>
            <h3 class="product-name">${prod.name}</h3>
            <p class="product-desc">${prod.description}</p>
            <div class="product-footer">
              <div>
                <span class="product-price-label">Price</span>
                <span class="product-price">${prod.price}</span>
              </div>
              <button class="product-btn" aria-label="Inquire about ${prod.name}" onclick="inquireProduct('${prod.name}')">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        grid.insertBefore(card, emptyState);
      });
    }
  }
}

// Inquiry helper (Prefills contact form subject and scrolls down)
window.inquireProduct = function(productName) {
  const subjectInput = document.getElementById('form-subject');
  const contactSection = document.getElementById('contact');
  
  if (subjectInput && contactSection) {
    subjectInput.value = `Inquiry about: ${productName}`;
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Animate outline flash to show visual focus on the form
    const contactForm = document.getElementById('contact-form-panel');
    if (contactForm) {
      contactForm.style.transition = 'box-shadow 0.3s ease';
      contactForm.style.boxShadow = '0 0 0 4px var(--secondary-color)';
      setTimeout(() => {
        contactForm.style.boxShadow = 'var(--shadow-md)';
      }, 1500);
    }
  }
};

/* ==========================================
   SCROLL EFFECTS (HEADER TRANSITIONS & FLOAT BUTTON)
   ========================================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // 1. Sticky blurred header styling
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Scroll-to-top floating button visibility
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }

    // 3. Dynamic active nav section highlighters
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Scroll to top click trigger
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   CONTACT FORM VALIDATION & SUBMISSION SUCCESS STATES
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch values
    const nameInput = document.getElementById('form-name');
    const contactInput = document.getElementById('form-contact-info');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    // Clean validation
    let isValid = true;

    // Reset control styling
    [nameInput, contactInput, subjectInput].forEach(input => {
      input.style.borderColor = 'var(--border-color)';
    });

    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = 'red';
      isValid = false;
    }
    if (!contactInput.value.trim()) {
      contactInput.style.borderColor = 'red';
      isValid = false;
    }
    if (!subjectInput.value.trim()) {
      subjectInput.style.borderColor = 'red';
      isValid = false;
    }

    if (!isValid) {
      // Add dynamic shake effect or visual notice
      alert('Please fill out the highlighted fields so we can contact you.');
      return;
    }

    // Disable submit button during submission
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending Message...';

    // Submit to Google Form
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);

    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScEggd7AWnjC8w3CMh6Vk1xHXOgVvEns_ow5QwkyyNoHrUkjg/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: searchParams
    })
    .then(() => {
      // Hide form elements cleanly
      form.style.display = 'none';
      document.getElementById('form-heading').style.display = 'none';
      
      // Reveal success dialog box
      successBox.style.display = 'block';
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      alert('There was an issue sending your message. Please try again or reach out to us via WhatsApp/phone.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send Message';
    });
  });
}
