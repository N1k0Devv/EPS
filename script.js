// Main JavaScript functionality - Enhanced version with checkout integration
class EPSWebsite {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("epsCart")) || [];
    this.products = [];
    this.filteredProducts = [];
    this.content = window.georgianContent || {};

    this.init();
  }

  init() {
    // Wait for products data to load
    this.waitForProducts().then(() => {
      this.products = window.productsData || [];
      this.filteredProducts = [...this.products];
      this.setupEventListeners();
      this.loadProducts();
      this.updateCartUI();
      this.setupScrollAnimations();
      this.setupSmoothScrolling();
      this.createScrollToTopButton();
      this.setupMobileMenu();
    });
  }

  waitForProducts() {
    return new Promise((resolve) => {
      if (window.productsData) {
        resolve();
      } else {
        const checkProducts = () => {
          if (window.productsData) {
            resolve();
          } else {
            setTimeout(checkProducts, 100);
          }
        };
        checkProducts();
      }
    });
  }

  setupEventListeners() {
    // Cart functionality
    const cartIcon = document.getElementById("cart-icon");
    const cartClose = document.getElementById("cart-close");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (cartIcon) cartIcon.addEventListener("click", () => this.toggleCart());
    if (cartClose) cartClose.addEventListener("click", () => this.closeCart());
    if (checkoutBtn)
      checkoutBtn.addEventListener("click", () => this.goToCheckout());

    // Product search and filters
    const productSearch = document.getElementById("product-search");
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");

    if (productSearch) {
      productSearch.addEventListener("input", (e) =>
        this.searchProducts(e.target.value)
      );
    }
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.filterProducts());
    }
    if (priceFilter) {
      priceFilter.addEventListener("change", () => this.filterProducts());
    }

    // Navigation
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavigation(e));
    });

    // Close cart when clicking outside
    document.addEventListener("click", (e) => {
      const cartSidebar = document.getElementById("cart-sidebar");
      const cartIcon = document.getElementById("cart-icon");

      if (
        cartSidebar &&
        cartIcon &&
        !cartSidebar.contains(e.target) &&
        !cartIcon.contains(e.target)
      ) {
        this.closeCart();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeCart();
      }
    });
  }

  setupMobileMenu() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
      });

      // Close menu when clicking on a link
      document.querySelectorAll(".nav__link").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        });
      });
    }
  }

  loadProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    if (this.filteredProducts.length === 0) {
      productsGrid.innerHTML =
        '<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6b7280;">პროდუქტები ვერ მოიძებნა</div>';
      return;
    }

    this.filteredProducts.forEach((product) => {
      const productCard = this.createProductCard(product);
      productsGrid.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card fade-in";
    card.setAttribute("data-category", product.category);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-name", product.name.toLowerCase());

    // Create image element with fallback
    const imageHtml =
      product.image && product.image.startsWith("http")
        ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc, #e0f2fe); color: #0ea5e9; font-size: 2rem;">🏗️</div>`
        : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc, #e0f2fe); color: #0ea5e9; font-size: 2rem;">🏗️</div>`;

    card.innerHTML = `
            <div class="product-image" style="height: 200px; overflow: hidden; border-radius: 16px 16px 0 0;">
                ${imageHtml}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs" style="margin: 1rem 0; padding: 0.5rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem;">
                    ${Object.entries(product.specifications || {})
                      .slice(0, 2)
                      .map(
                        ([key, value]) =>
                          `<div><strong>${key}:</strong> ${value}</div>`
                      )
                      .join("")}
                </div>
                <div class="product-price">${product.price.toFixed(
                  2
                )} ლარი</div>
                <button class="add-to-cart ${
                  !product.inStock ? "disabled" : ""
                }" 
                        ${!product.inStock ? "disabled" : ""} 
                        onclick="window.epsWebsite.addToCart(${product.id})">
                    ${product.inStock ? "კალათაში დამატება" : "არ არის მარაგში"}
                </button>
            </div>
        `;

    return card;
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();

    this.filteredProducts = this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    });

    this.applyFilters();
    this.loadProducts();
  }

  filterProducts() {
    this.applyFilters();
    this.loadProducts();
  }

  applyFilters() {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");

    if (!categoryFilter || !priceFilter) return;

    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    let filtered = [...this.products];

    // Apply search if there's a search term
    const searchInput = document.getElementById("product-search");
    if (searchInput && searchInput.value.trim()) {
      const searchTerm = searchInput.value.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange
        .split("-")
        .map((p) => p.replace("+", ""));
      const minPrice = parseInt(min) || 0;
      const maxPrice = max ? parseInt(max) : Infinity;

      filtered = filtered.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    this.filteredProducts = filtered;
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showNotification("პროდუქტი დაემატა კალათაში");
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
    this.showNotification("პროდუქტი ამოიშალა კალათიდან");
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((item) => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart();
      this.updateCartUI();
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartCount || !cartItems || !cartTotal) return;

    // Update cart count
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";

    // Update cart items
    if (this.cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">კალათა ცარიელია</p>';
    } else {
      cartItems.innerHTML = this.cart
        .map(
          (item) => `
                <div class="cart-item">
                    <div class="cart-item-image" style="width: 60px; height: 60px; background: linear-gradient(135deg, #f8fafc, #e0f2fe); display: flex; align-items: center; justify-content: center; border-radius: 8px; color: #0ea5e9; font-size: 1.5rem;">
                        🏗️
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(
                          2
                        )} ლარი</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="window.epsWebsite.updateQuantity(${
                              item.id
                            }, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.epsWebsite.updateQuantity(${
                              item.id
                            }, 1)">+</button>
                            <button class="quantity-btn" onclick="window.epsWebsite.removeFromCart(${
                              item.id
                            })" style="margin-left: 10px; background: #ef4444; color: white;">×</button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }

    // Update total
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = total.toFixed(2);

    // Update checkout button
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.disabled = this.cart.length === 0;
      checkoutBtn.textContent =
        this.cart.length === 0 ? "კალათა ცარიელია" : "შეკვეთის გაფორმება";
    }
  }

  toggleCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    if (cartSidebar) {
      cartSidebar.classList.toggle("active");
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    if (cartSidebar) {
      cartSidebar.classList.remove("active");
    }
  }

  goToCheckout() {
    if (this.cart.length === 0) {
      this.showNotification("კალათა ცარიელია", "error");
      return;
    }

    // Navigate to checkout page
    window.location.href = "checkout.html";
  }

  checkout() {
    // This method is kept for backward compatibility
    this.goToCheckout();
  }

  saveCart() {
    localStorage.setItem("epsCart", JSON.stringify(this.cart));
  }

  showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            z-index: 1002;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

    if (type === "error") {
      notification.style.background =
        "linear-gradient(135deg, #ef4444, #dc2626)";
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active navigation
        document.querySelectorAll(".nav__link").forEach((link) => {
          link.classList.remove("active");
        });
        e.target.classList.add("active");
      }
    }
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
      .forEach((el) => {
        observer.observe(el);
      });

    // Update navigation on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    });
  }

  setupSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  createScrollToTopButton() {
    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-to-top";
    scrollButton.innerHTML = "↑";
    scrollButton.setAttribute("aria-label", "Scroll to top");

    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    });
  }
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.epsWebsite = new EPSWebsite();
});

// Performance optimization: Lazy load images when they come into view
document.addEventListener("DOMContentLoaded", () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
});

// Add structured data for SEO
document.addEventListener("DOMContentLoaded", () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ეპს ქარხანა",
    description: "საქართველოს წამყვანი ექსპანდირებული პოლისტირენის მწარმოებელი",
    url: window.location.origin,
    logo: "https://public-frontend-cos.metadl.com/mgx/img/favicon.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+995-32-2-XX-XX-XX",
      contactType: "customer service",
      availableLanguage: "Georgian",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
      addressLocality: "თბილისი",
      addressRegion: "საქართველო",
    },
    sameAs: [],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
