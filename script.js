/* ==========================================================================
   RK TRADERS STATIONERY WEBSITE - INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollObserver();
  initProducts();
  initScrollEffects();
  initContactForm();
  initLightbox();
  initCountUp();
  initScrollReveals();
  initReviewsCarousel();
  initHeroParallax();
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
  // Notebooks
  {
    id: 1,
    name: "Classmate A4 Notebook (200 Pages)",
    category: "notebooks",
    price: "₹65",
    description: "Premium single-line notebook with smooth, eco-friendly paper. Perfect for college lectures and record maintenance.",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Classmate Practical Record Book",
    category: "notebooks",
    price: "₹85",
    description: "Prescribed A4 size record book with alternate ruled and plain sheets for lab sketches, diagrams, and tables.",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Premium Spiral Bound Notepad A5",
    category: "notebooks",
    price: "₹110",
    description: "Hardcover micro-perforated spiral notebook. Ideal for quick engineering calculations and project diaries.",
    tag: "Student Fav",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80"
  },

  // Writing
  {
    id: 4,
    name: "Parker Vector Matte Black Ball Pen",
    category: "writing",
    price: "₹250",
    description: "Elegant professional pen with a smooth ink flow. Features executive matte finish and stainless steel clip.",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Rotring Tikky Mechanical Pencil 0.5mm",
    category: "writing",
    price: "₹180",
    description: "High-precision mechanical pencil with triangular barrel for drawing and comfortable sketching. Ideal for drafting.",
    tag: "Precision",
    image: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Uniball Eye UB-150 Gel Pens (Pack of 3)",
    category: "writing",
    price: "₹210",
    description: "Super long-lasting waterproof fade-proof liquid gel pens. Standard choice for college writing.",
    tag: "Essential",
    image: "https://images.unsplash.com/photo-1585336139080-b019d0b2d3dd?auto=format&fit=crop&w=500&q=80"
  },

  // Electronics
  {
    id: 7,
    name: "Casio fx-991EX ClassWiz Calculator",
    category: "electronics",
    price: "₹1,495",
    description: "Advanced scientific calculator featuring 552 functions, spreadsheets, and matrix solvers. Essential for TKM Engineering students.",
    tag: "TKM Special",
    image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Casio fx-82MS Scientific Calculator",
    category: "electronics",
    price: "₹695",
    description: "Standard 240-function 2-line scientific calculator. Approved for university and school board examinations.",
    tag: "Student Fav",
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=500&q=80"
  },

  // Engineering & Architecture
  {
    id: 9,
    name: "Omega Mini Drafter (Professional)",
    category: "engineering",
    price: "₹450",
    description: "Premium mechanical mini-drafter with horizontal and vertical scales. Built with heavy-duty metal clamps.",
    tag: "TKM Special",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    name: "Imperial Wooden Drawing Board (A1)",
    category: "engineering",
    price: "₹650",
    description: "Crafted seasoned pine wood board with ebony edge. Perfect companion for engineering drawing classes.",
    tag: "Essential",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    name: "Rotring Isograph Technical Pen 0.3mm",
    category: "engineering",
    price: "₹1,850",
    description: "High-precision chrome-plated architectural drawing pen. Refillable ink system for professional blueprint sketches.",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    name: "Staedtler Geometry Compass Set",
    category: "engineering",
    price: "₹550",
    description: "Precision drafting compass set in a secure storage case. Includes extensions, adapters, and replacement leads.",
    tag: "Precision",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 13,
    name: "80cm Hardwood T-Square Ruler",
    category: "engineering",
    price: "₹320",
    description: "Polished wood architectural T-square with transparent acrylic edges for drafting layout guidelines.",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80"
  },

  // Art & Craft
  {
    id: 14,
    name: "Faber-Castell Artist Brush Pens (12 Colors)",
    category: "art",
    price: "₹380",
    description: "Flexible brush tips for fine sketching, calligraphy, and watercolor painting. Features rich, vibrant colors.",
    tag: "Art Special",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 15,
    name: "Camel Acrylic Colors Set (12 Shades)",
    category: "art",
    price: "₹280",
    description: "Rich, fast-drying non-toxic pigments. Suitable for canvas paintings, woodwork, and architecture models.",
    tag: "Creative",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 16,
    name: "Self-Healing Cutting Mat (A2)",
    category: "art",
    price: "₹420",
    description: "Durable self-healing cutting board with grid guidelines. Essential for architecture model building.",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1572945281861-68b1a3d3c8c7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 17,
    name: "Architecture Foam Boards (5 Pack)",
    category: "art",
    price: "₹250",
    description: "Lightweight, sturdy white foam boards. Ideal for architectural model making and mock-up presentations.",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80"
  },

  // Office Files & Stationery
  {
    id: 18,
    name: "Solo A4 Ring Binder File",
    category: "office",
    price: "₹120",
    description: "Heavy-duty ring binder file with index sheets. Perfect for archiving project documents and corporate reports.",
    tag: "Office",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 19,
    name: "Kangaro Heavy Duty Stapler (HD-45)",
    category: "office",
    price: "₹190",
    description: "All-metal construction stapler with quick loading. Staples up to 30 sheets of printer paper easily.",
    tag: "Office",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 20,
    name: "JK Copier A4 Printer Paper (75GSM, Ream)",
    category: "office",
    price: "₹340",
    description: "High-brightness photocopying paper. Jam-free printing performance for office laser printers.",
    tag: "Bulk Deal",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=500&q=80"
  },

  // School Bags & Bottles
  {
    id: 22,
    name: "Cello H2O Stainless Steel Bottle (1L)",
    category: "school",
    price: "₹290",
    description: "Insulated food-grade leak-proof stainless steel bottle. Keeps water cool during hot college days.",
    tag: "Essential",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 23,
    name: "Milton Insulated Lunch Box",
    category: "school",
    price: "₹380",
    description: "Topseller leakproof lunchbox container with stainless steel inner bowl. Keeps food fresh and hot.",
    tag: "Essential",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 24,
    name: "A3 Tracing Paper Roll (50m)",
    category: "engineering",
    price: "₹450",
    description: "Ultra-transparent, heavy-weight tracing paper roll. Smooth surface for architecture overlay drawings and blueprint copies.",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 25,
    name: "Professional Set Squares Set (30/60 & 45)",
    category: "engineering",
    price: "₹280",
    description: "Thick, durable transparent acrylic set squares with bevelled edges. Features high-accuracy centimeter and angle markings.",
    tag: "TKM Special",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80"
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

      filtered.forEach((prod, index) => {
        const card = document.createElement('article');
        card.className = 'product-card scroll-reveal-up';
        card.setAttribute('data-id', prod.id);
        
        // Dynamic animation stagger
        const staggerIndex = index % 4;
        card.style.transitionDelay = `${staggerIndex * 0.08}s`;

        const badgeHTML = prod.tag ? `<span class="product-tag">${prod.tag}</span>` : '';

        card.innerHTML = `
          <div class="product-image-container">
            ${badgeHTML}
            <img src="${prod.image}" alt="${prod.name}" class="product-image" loading="lazy">
          </div>
          <div class="product-info">
            <span class="product-category">${prod.category}</span>
            <h3 class="product-name">${prod.name}</h3>
            <p class="product-desc">${prod.description}</p>
            <div class="product-footer" style="justify-content: flex-end; border-top: none; padding-top: 0;">
              <button class="product-btn" aria-label="Inquire about ${prod.name}" onclick="inquireProduct('${prod.name}')">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        grid.insertBefore(card, emptyState);
        if (window.scrollObserver) {
          window.scrollObserver.observe(card);
        }
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

/* ==========================================================================
   SCROLL REVEAL OBSERVER & SETUP
   ========================================================================== */
function initScrollObserver() {
  window.scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
}

function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-fade'
  );
  revealElements.forEach(el => {
    if (window.scrollObserver) {
      window.scrollObserver.observe(el);
    }
  });
}

/* ==========================================================================
   DYNAMIC NUMBER COUNT-UP ANIMATION
   ========================================================================== */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1600; // ms
    const startTime = performance.now();
    
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic: easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(easeProgress * target);
      counter.innerText = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    
    requestAnimationFrame(update);
  };
  
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // Count only once
      }
    });
  }, { threshold: 0.1 });
  
  counters.forEach(counter => statsObserver.observe(counter));
}

/* ==========================================================================
   GALLERY LIGHTBOX TRIGGER & CONTROLS
   ========================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (!lightbox || !galleryItems.length) return;
  
  let currentIndex = 0;
  const imagesList = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src'),
    caption: item.querySelector('.gallery-info h3').innerText
  }));
  
  function showImage(index) {
    if (index < 0) index = imagesList.length - 1;
    if (index >= imagesList.length) index = 0;
    currentIndex = index;
    lightboxImg.src = imagesList[currentIndex].src;
    lightboxCaption.innerText = imagesList[currentIndex].caption;
  }
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showImage(index);
      lightbox.classList.add('active');
    });
  });
  
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* ==========================================================================
   REVIEWS TESTIMONIAL SLIDER CAROUSEL LOGIC
   ========================================================================== */
function initReviewsCarousel() {
  const track = document.getElementById('reviews-track');
  const container = document.querySelector('.reviews-carousel-container');
  if (!track || !container) return;
  
  const cards = Array.from(track.children);
  let index = 0;
  let intervalId = null;
  
  function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
  
  function slide() {
    const cardsPerView = getCardsPerView();
    const maxIndex = cards.length - cardsPerView;
    if (index > maxIndex) {
      index = 0;
    }
    
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // matching styles.css gap
    const amountToMove = (cardWidth + gap) * index;
    
    track.style.transform = `translateX(-${amountToMove}px)`;
  }
  
  function startAutoSlide() {
    intervalId = setInterval(() => {
      const cardsPerView = getCardsPerView();
      const maxIndex = cards.length - cardsPerView;
      index = index >= maxIndex ? 0 : index + 1;
      slide();
    }, 4000);
  }
  
  function stopAutoSlide() {
    if (intervalId) clearInterval(intervalId);
  }
  
  // Start slider
  startAutoSlide();
  
  // Pause slider on hover
  container.addEventListener('mouseenter', stopAutoSlide);
  container.addEventListener('mouseleave', startAutoSlide);
  
  // Handle resize window
  window.addEventListener('resize', () => {
    slide();
  });
}

/* ==========================================================================
   HERO BANNER PARALLAX SCROLLING
   ========================================================================== */
function initHeroParallax() {
  const parallaxImg = document.querySelector('.parallax-img');
  if (!parallaxImg) return;
  
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    // Limit translation offset to keep it subtle and elegant
    if (scrollPos < 800) {
      const yOffset = scrollPos * 0.15;
      parallaxImg.style.transform = `translateY(${yOffset}px)`;
    }
  });
}
