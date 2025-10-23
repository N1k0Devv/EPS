// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateCartDisplay();
  initializeAnimations();
  initializeMobileMenu();
  initializeNavbarEffects();
   initializeCartEvents();
  console.log("EPS Factory website loaded!");
});

// Initialize enhanced navbar effects
function initializeNavbarEffects() {
  const navbar = document.querySelector(".navbar");

  // Enhanced scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}


// Enhanced animations and interactions
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
        entry.target.style.opacity = "1";
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document
    .querySelectorAll(
      ".feature-card, .product-card, .why-us-item, .contact-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });

  // Enhanced parallax effect for hero section
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".eps-visual");

    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(${
        1 + scrolled * 0.0001
      })`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Add stagger animation to grid items
  const gridItems = document.querySelectorAll(".feature-card, .product-card");
  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
}

// Enhanced cart toggle with better animations
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  const isOpen = cartSidebar.classList.contains("open");

  if (isOpen) {
    cartSidebar.classList.remove("open");
    document.body.style.overflow = "auto";
    removeOverlay();
  } else {
    cartSidebar.classList.add("open");
    document.body.style.overflow = "hidden";
    createOverlay();
    updateCartDisplay();
  }
}

// Enhanced overlay creation
function createOverlay() {
  const existingOverlay = document.querySelector(".cart-overlay");
  if (existingOverlay) return;

  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.3s ease;
        cursor: pointer;
    `;

  overlay.addEventListener("click", toggleCart);
  document.body.appendChild(overlay);
}

// Enhanced overlay removal
function removeOverlay() {
  const overlay = document.querySelector(".cart-overlay");
  if (overlay) {
    overlay.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => overlay.remove(), 300);
  }
}

// Enhanced add to cart with improved feedback
function addToCart(id, name, price, image = "") {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();

  // Enhanced success notification with better animation
  showEnhancedNotification(`${name} დაემატა კალათაში!`, "success");

  // Enhanced cart bounce animation
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.style.animation =
      "cartBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    setTimeout(() => {
      cartIcon.style.animation = "";
    }, 600);
  }
}

// Remove item from cart
function removeFromCart(id) {
  const item = cart.find((item) => item.id === id);
  const itemName = item ? item.name : "პროდუქტი";

  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
  showEnhancedNotification(`${itemName} წაიშალა კალათიდან`, "info");
}

// Enhanced quantity update
function updateQuantity(id, quantity) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    const oldQuantity = item.quantity;
    item.quantity = Math.max(1, quantity);

    if (item.quantity !== oldQuantity) {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();

      // Add subtle feedback for quantity changes
      const cartItems = document.getElementById("cart-items");
      if (cartItems) {
        const itemElement = cartItems.querySelector(`[data-item-id="${id}"]`);
        if (itemElement) {
          itemElement.style.animation = "pulse 0.3s ease";
          setTimeout(() => {
            itemElement.style.animation = "";
          }, 300);
        }
      }
    }
  }
}

// Enhanced cart count update with better animation
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Enhanced animation when count changes
    if (cartCount.textContent !== totalItems.toString()) {
      cartCount.style.animation =
        "countPulse 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      setTimeout(() => {
        cartCount.style.animation = "";
      }, 500);
    }

    cartCount.textContent = totalItems;

    // Add visual indicator for items in cart
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      if (totalItems > 0) {
        cartIcon.classList.add("has-items");
      } else {
        cartIcon.classList.remove("has-items");
      }
    }
  }
}

// Enhanced cart display with better UX
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <div style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.5;">🛒</div>
                <h3 style="margin-bottom: 1rem; color: #2c3e50;">კალათა ცარიელია</h3>
                <p style="opacity: 0.8;">დაამატეთ პროდუქტები შესაძენად</p>
            </div>
        `;
    if (cartTotal) cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;
  let cartHTML = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
            <div class="cart-item" data-item-id="${
              item.id
            }" style="animation: slideInRight 0.3s ease ${index * 0.1}s both;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; color: #2c3e50; font-weight: 600;">${
                      item.name
                    }</h4>
                    <p style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">₾${item.price.toFixed(
                      2
                    )} × ${item.quantity}</p>
                    <p style="color: #e74c3c; font-weight: 700; font-size: 1.1rem;">₾${itemTotal.toFixed(
                      2
                    )}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateQuantity('${item.id}', ${
      item.quantity - 1
    })" 
                            ${item.quantity <= 1 ? "disabled" : ""}
                            style="width: 35px; height: 35px; border-radius: 50%; font-weight: bold; font-size: 1.2rem;">−</button>
                    <span style="min-width: 40px; text-align: center; font-weight: 700; font-size: 1.1rem; color: #2c3e50;">${
                      item.quantity
                    }</span>
                    <button onclick="updateQuantity('${item.id}', ${
      item.quantity + 1
    })"
                            style="width: 35px; height: 35px; border-radius: 50%; font-weight: bold; font-size: 1.2rem;">+</button>
                    <button onclick="removeFromCart('${item.id}')" 
                            style="background: #e74c3c; width: 35px; height: 35px; border-radius: 50%; margin-left: 0.5rem; font-size: 1.1rem;">×</button>
                </div>
            </div>
        `;
  });

  cartItems.innerHTML = cartHTML;
  if (cartTotal) {
    // Animate total change
    cartTotal.style.animation = "countPulse 0.3s ease";
    setTimeout(() => {
      cartTotal.style.animation = "";
    }, 300);
    cartTotal.textContent = total.toFixed(2);
  }
}

// Enhanced notification system with better positioning and animations
function showEnhancedNotification(message, type = "success") {
  const notification = document.createElement("div");

  const colors = {
    success: { bg: "#27ae60", icon: "✓", border: "#2ecc71" },
    error: { bg: "#e74c3c", icon: "✕", border: "#c0392b" },
    info: { bg: "#3498db", icon: "ℹ", border: "#2980b9" },
    warning: { bg: "#f39c12", icon: "⚠", border: "#e67e22" },
  };

  const color = colors[type] || colors.success;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: -450px;
        background: ${color.bg};
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 15px;
        z-index: 1003;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        min-width: 350px;
        max-width: 400px;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 4px solid ${color.border};
        backdrop-filter: blur(10px);
    `;

  notification.innerHTML = `
        <span style="font-size: 1.5rem; background: rgba(255,255,255,0.2); padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">${color.icon}</span>
        <span style="flex: 1;">${message}</span>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.right = "20px";
  }, 100);

  // Animate out
  setTimeout(() => {
    notification.style.right = "-450px";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 400);
  }, 4000);

  // Add click to dismiss
  notification.addEventListener("click", () => {
    notification.style.right = "-450px";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 400);
  });
}

// Enhanced product filtering with better animations
function filterProducts(category) {
  const products = document.querySelectorAll(".product-card");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Update active filter button
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Animate products out first
  products.forEach((product, index) => {
    setTimeout(() => {
      product.style.animation = "fadeOutScale 0.3s ease forwards";
    }, index * 30);
  });

  // Then show/hide and animate in
  setTimeout(() => {
    let visibleIndex = 0;
    products.forEach((product) => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
        setTimeout(() => {
          product.style.animation = `fadeInScale 0.5s ease ${
            visibleIndex * 0.1
          }s forwards`;
        }, 50);
        visibleIndex++;
      } else {
        product.style.display = "none";
      }
    });
  }, 400);
}

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced checkout form handling
function handleCheckout(event) {
  event.preventDefault();

  // Show enhanced loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = `
    <span style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="width: 20px; height: 20px; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></span>
      მუშავდება...
    </span>
  `;
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.8";

  const formData = new FormData(event.target);
  const orderData = {
    customer: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      delivery: formData.get("delivery"),
      payment: formData.get("payment"),
      notes: formData.get("notes"),
    },
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toISOString(),
  };

  // Simulate order processing with realistic delay
  setTimeout(() => {
    showEnhancedNotification("შეკვეთა წარმატებით გაიგზავნა! 🎉", "success");

    // Clear cart with animation
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Reset form with animation
    event.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";

    // Show success sequence
    setTimeout(() => {
      showEnhancedNotification(
        "მადლობთ შეკვეთისთვის! ჩვენ მალე დაგიკავშირდებით. 📞",
        "info"
      );
      setTimeout(() => {
        showEnhancedNotification("გადამისამართება მთავარ გვერდზე...", "info");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }, 2000);
    }, 1000);
  }, 2500);
}

// Enhanced keyboard navigation
document.addEventListener("keydown", function (event) {
  // Close cart with Escape key
  if (event.key === "Escape") {
    const cartSidebar = document.getElementById("cart-sidebar");
    if (cartSidebar && cartSidebar.classList.contains("open")) {
      toggleCart();
    }

    // Close mobile menu with Escape key
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu && navMenu.classList.contains("mobile-open")) {
      closeMobileMenu();
    }
  }

  // Quick cart toggle with 'C' key
  if (event.key.toLowerCase() === "c" && event.ctrlKey) {
    event.preventDefault();
    toggleCart();
  }
});

// Enhanced image loading with better performance
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  // Intersection Observer for lazy loading images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.animation = "fadeIn 0.6s ease";
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
});

// Enhanced custom animations
const style = document.createElement("style");
style.textContent = `
    @keyframes cartBounce {
        0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
        40% { transform: translateY(-15px) scale(1.15); }
        80% { transform: translateY(-8px) scale(1.08); }
    }
    
    @keyframes countPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes fadeInScale {
        from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    @keyframes fadeOutScale {
        from { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
        to { 
            opacity: 0; 
            transform: translateY(-30px) scale(0.9); 
        }
    }
    
    @keyframes slideInRight {
        from { 
            opacity: 0; 
            transform: translateX(50px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .cart-icon.has-items {
        animation: pulse 2s ease-in-out infinite;
    }
    
    .nav-link {
        position: relative;
    }
    
    .nav-link:focus-visible {
        outline: 2px solid #3498db;
        outline-offset: 2px;
        border-radius: 8px;
    }
`;
document.head.appendChild(style);

// Enhanced page transitions
window.addEventListener("beforeunload", function () {
  document.body.style.opacity = "0.95";
  document.body.style.transition = "opacity 0.2s ease";
});

// Enhanced tooltips with better positioning
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");
  let currentTooltip = null;

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
    element.addEventListener("focus", showTooltip);
    element.addEventListener("blur", hideTooltip);
  });

  function showTooltip(event) {
    hideTooltip(); // Hide any existing tooltip

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = event.target.dataset.tooltip;
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1004;
        pointer-events: none;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        max-width: 200px;
        text-align: center;
        font-weight: 500;
    `;

    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    const rect = event.target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Smart positioning
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top - tooltipRect.height - 10;

    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
      top = rect.bottom + 10;
    }

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }

  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.style.animation = "fadeOut 0.2s ease";
      setTimeout(() => {
        if (currentTooltip && currentTooltip.parentNode) {
          currentTooltip.remove();
        }
        currentTooltip = null;
      }, 200);
    }
  }
}

// Performance optimization: Debounced resize handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle responsive breakpoint changes
const handleResize = debounce(() => {
  const navMenu = document.querySelector(".nav-menu");
  const hamburger = document.querySelector(".hamburger");

  if (window.innerWidth > 768) {
    if (navMenu && navMenu.classList.contains("mobile-open")) {
      closeMobileMenu();
    }
  }
}, 250);

window.addEventListener("resize", handleResize);

// Initialize all enhancements
document.addEventListener("DOMContentLoaded", function () {
  initializeTooltips();

  // Add loading class removal after page load
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// Service Worker registration for better performance (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".mobile-overlay");

  // Toggle menu open/close
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});