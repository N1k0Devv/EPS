// Checkout Page JavaScript Functionality
class CheckoutManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("epsCart")) || [];
    this.deliveryCost = 0;
    this.discountAmount = 0;
    this.promoCodes = {
      EPS10: {
        discount: 0.1,
        minOrder: 50,
        description: "10% ფასდაკლება 50 ლარზე მეტი შეკვეთისთვის",
      },
      FIRST20: {
        discount: 0.2,
        minOrder: 100,
        description: "20% ფასდაკლება პირველი შეკვეთისთვის",
      },
      SUMMER15: {
        discount: 0.15,
        minOrder: 75,
        description: "15% ზაფხულის ფასდაკლება",
      },
    };

    this.init();
  }

  init() {
    this.loadCartItems();
    this.calculateTotals();
    this.setupEventListeners();
    this.setupFormValidation();
    this.updateCartCount();

    // Redirect if cart is empty
    if (this.cart.length === 0) {
      this.showEmptyCartMessage();
    }
  }

  setupEventListeners() {
    // Customer type change
    const customerType = document.getElementById("customer-type");
    if (customerType) {
      customerType.addEventListener("change", () =>
        this.toggleBusinessFields()
      );
    }

    // Delivery type change
    document.querySelectorAll('input[name="deliveryType"]').forEach((radio) => {
      radio.addEventListener("change", () => this.updateDeliveryCost());
    });

    // Payment method change
    document
      .querySelectorAll('input[name="paymentMethod"]')
      .forEach((radio) => {
        radio.addEventListener("change", () => this.updatePaymentInfo());
      });

    // Promo code
    const applyPromoBtn = document.getElementById("apply-promo");
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener("click", () => this.applyPromoCode());
    }

    const promoInput = document.getElementById("promo-code");
    if (promoInput) {
      promoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.applyPromoCode();
        }
      });
    }

    // Form submission
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Phone number formatting
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => this.formatPhoneNumber(e));
    }
  }

  loadCartItems() {
    const checkoutItems = document.getElementById("checkout-items");
    if (!checkoutItems) return;

    if (this.cart.length === 0) {
      checkoutItems.innerHTML =
        '<p class="empty-cart-message">კალათა ცარიელია</p>';
      return;
    }

    checkoutItems.innerHTML = this.cart
      .map(
        (item) => `
            <div class="checkout-item">
                <div class="checkout-item-image">🏗️</div>
                <div class="checkout-item-info">
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-details">
                        <span>რაოდენობა: ${item.quantity}</span>
                        <span class="checkout-item-price">${(
                          item.price * item.quantity
                        ).toFixed(2)} ლარი</span>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  calculateTotals() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const finalTotal = subtotal + this.deliveryCost - this.discountAmount;

    // Update UI
    const subtotalEl = document.getElementById("subtotal");
    const deliveryCostEl = document.getElementById("delivery-cost");
    const discountAmountEl = document.getElementById("discount-amount");
    const discountRowEl = document.getElementById("discount-row");
    const finalTotalEl = document.getElementById("final-total");

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} ლარი`;
    if (deliveryCostEl)
      deliveryCostEl.textContent = `${this.deliveryCost.toFixed(2)} ლარი`;
    if (discountAmountEl)
      discountAmountEl.textContent = `-${this.discountAmount.toFixed(2)} ლარი`;
    if (finalTotalEl)
      finalTotalEl.textContent = `${finalTotal.toFixed(2)} ლარი`;

    if (discountRowEl) {
      discountRowEl.style.display = this.discountAmount > 0 ? "flex" : "none";
    }
  }

  toggleBusinessFields() {
    const customerType = document.getElementById("customer-type").value;
    const businessFields = document.querySelector(".business-fields");
    const companyName = document.getElementById("company-name");
    const taxNumber = document.getElementById("tax-number");

    if (customerType === "business") {
      businessFields.style.display = "block";
      companyName.required = true;
      taxNumber.required = true;
    } else {
      businessFields.style.display = "none";
      companyName.required = false;
      taxNumber.required = false;
    }
  }

  updateDeliveryCost() {
    const selectedDelivery = document.querySelector(
      'input[name="deliveryType"]:checked'
    );
    if (!selectedDelivery) return;

    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    switch (selectedDelivery.value) {
      case "standard":
        this.deliveryCost = subtotal >= 50 ? 0 : 10;
        break;
      case "express":
        this.deliveryCost = 15;
        break;
      case "pickup":
        this.deliveryCost = 0;
        break;
      default:
        this.deliveryCost = 0;
    }

    this.calculateTotals();
  }

  updatePaymentInfo() {
    const selectedPayment = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );
    if (!selectedPayment) return;

    // You can add payment-specific logic here
    console.log("Payment method selected:", selectedPayment.value);
  }

  applyPromoCode() {
    const promoInput = document.getElementById("promo-code");
    const promoMessage = document.getElementById("promo-message");
    const promoCode = promoInput.value.trim().toUpperCase();

    if (!promoCode) {
      this.showPromoMessage("შეიყვანეთ პრომო კოდი", "error");
      return;
    }

    const promo = this.promoCodes[promoCode];
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (!promo) {
      this.showPromoMessage("არასწორი პრომო კოდი", "error");
      return;
    }

    if (subtotal < promo.minOrder) {
      this.showPromoMessage(
        `მინიმუმ ${promo.minOrder} ლარის შეკვეთა საჭიროა`,
        "error"
      );
      return;
    }

    this.discountAmount = subtotal * promo.discount;
    this.showPromoMessage(
      `პრომო კოდი გამოყენებულია! ${promo.description}`,
      "success"
    );
    this.calculateTotals();

    // Disable promo input after successful application
    promoInput.disabled = true;
    document.getElementById("apply-promo").disabled = true;
  }

  showPromoMessage(message, type) {
    const promoMessage = document.getElementById("promo-message");
    promoMessage.textContent = message;
    promoMessage.className = `promo-message ${type}`;

    setTimeout(() => {
      if (type === "error") {
        promoMessage.textContent = "";
        promoMessage.className = "promo-message";
      }
    }, 5000);
  }

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("995")) {
      value = value.substring(3);
    }

    if (value.length > 0) {
      if (value.length <= 3) {
        value = `+995 ${value}`;
      } else if (value.length <= 6) {
        value = `+995 ${value.substring(0, 3)} ${value.substring(3)}`;
      } else {
        value = `+995 ${value.substring(0, 3)} ${value.substring(
          3,
          6
        )} ${value.substring(6, 9)}`;
      }
    }

    e.target.value = value;
  }

  setupFormValidation() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Required field validation
    if (field.required && !value) {
      isValid = false;
      errorMessage = "ეს ველი სავალდებულოა";
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "შეიყვანეთ სწორი ელ. ფოსტის მისამართი";
      }
    }

    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^\+995 \d{3} \d{3} \d{3}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = "შეიყვანეთ სწორი ტელეფონის ნომერი";
      }
    }

    this.showFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  showFieldValidation(field, isValid, errorMessage) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Remove validation classes
    field.classList.remove("error", "success");

    if (!isValid) {
      field.classList.add("error");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = errorMessage;
      field.parentNode.appendChild(errorDiv);
    } else if (field.value.trim()) {
      field.classList.add("success");
    }
  }

  clearFieldError(field) {
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  validateForm() {
    const form = document.getElementById("checkout-form");
    const requiredFields = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.showNotification("გთხოვთ შეავსოთ ყველა სავალდებულო ველი", "error");
      return;
    }

    if (this.cart.length === 0) {
      this.showNotification("კალათა ცარიელია", "error");
      return;
    }

    // Show loading state
    this.showLoadingState(true);

    try {
      // Simulate API call
      await this.submitOrder();
      this.showOrderConfirmation();
    } catch (error) {
      console.error("Order submission error:", error);
      this.showNotification(
        "შეკვეთის გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ ხელახლა.",
        "error"
      );
    } finally {
      this.showLoadingState(false);
    }
  }

  showLoadingState(show) {
    const submitBtn = document.getElementById("place-order-btn");
    if (show) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="loading-spinner"></span> მუშავდება...';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "შეკვეთის გაფორმება";
    }
  }

  async submitOrder() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const formData = new FormData(document.getElementById("checkout-form"));
    const orderData = {
      orderNumber: "EPS-" + Date.now(),
      customer: Object.fromEntries(formData),
      items: this.cart,
      totals: {
        subtotal: this.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        delivery: this.deliveryCost,
        discount: this.discountAmount,
        total:
          this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
          this.deliveryCost -
          this.discountAmount,
      },
      timestamp: new Date().toISOString(),
    };

    // In a real application, this would be sent to a server
    console.log("Order submitted:", orderData);

    // Store order for confirmation
    this.currentOrder = orderData;

    return orderData;
  }

  showOrderConfirmation() {
    const modal = document.getElementById("order-confirmation-modal");
    const orderNumber = document.getElementById("order-number");
    const confirmationDetails = document.getElementById("confirmation-details");
    const contactTime = document.getElementById("contact-time");

    // Set order number
    orderNumber.textContent = this.currentOrder.orderNumber;

    // Set contact time based on delivery method
    const deliveryType = document.querySelector(
      'input[name="deliveryType"]:checked'
    ).value;
    const contactTimes = {
      standard: "24 საათში",
      express: "2 საათში",
      pickup: "1 საათში",
    };
    contactTime.textContent = contactTimes[deliveryType] || "24 საათში";

    // Show order details
    confirmationDetails.innerHTML = `
            <h4>შეკვეთის დეტალები:</h4>
            <p><strong>პროდუქტების რაოდენობა:</strong> ${this.cart.length}</p>
            <p><strong>სულ ღირებულება:</strong> ${this.currentOrder.totals.total.toFixed(
              2
            )} ლარი</p>
            <p><strong>მიწოდების ტიპი:</strong> ${this.getDeliveryTypeText(
              deliveryType
            )}</p>
            <p><strong>გადახდის მეთოდი:</strong> ${this.getPaymentMethodText()}</p>
        `;

    // Show modal
    modal.style.display = "flex";

    // Clear cart
    this.clearCart();

    // Update steps
    this.updateCheckoutSteps(4);
  }

  getDeliveryTypeText(type) {
    const types = {
      standard: "სტანდარტული მიწოდება",
      express: "ექსპრეს მიწოდება",
      pickup: "თვითონ ამოღება",
    };
    return types[type] || type;
  }

  getPaymentMethodText() {
    const selectedPayment = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );
    const methods = {
      cash: "ნაღდი ანგარიშსწორება",
      bank: "საბანკო გადარიცხვა",
      card: "ბარათით გადახდა",
    };
    return methods[selectedPayment?.value] || "არ არის მითითებული";
  }

  updateCheckoutSteps(activeStep) {
    document.querySelectorAll(".step").forEach((step, index) => {
      if (index + 1 <= activeStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  clearCart() {
    localStorage.removeItem("epsCart");
    this.cart = [];
  }

  updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      const totalItems = this.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  showEmptyCartMessage() {
    const checkoutContent = document.querySelector(".checkout-content");
    if (checkoutContent) {
      checkoutContent.innerHTML = `
                <div class="empty-cart-checkout">
                    <div class="empty-cart-icon">🛒</div>
                    <h2>კალათა ცარიელია</h2>
                    <p>შეკვეთის გასაფორმებლად დაამატეთ პროდუქტები კალათაში</p>
                    <a href="index.html#products" class="btn btn--primary">პროდუქტების ნახვა</a>
                </div>
            `;

      // Add styles for empty cart message
      const style = document.createElement("style");
      style.textContent = `
                .empty-cart-checkout {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                .empty-cart-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }
                .empty-cart-checkout h2 {
                    color: #1f2937;
                    margin-bottom: 1rem;
                }
                .empty-cart-checkout p {
                    color: #6b7280;
                    margin-bottom: 2rem;
                }
            `;
      document.head.appendChild(style);
    }
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    document
      .querySelectorAll(".checkout-notification")
      .forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = "checkout-notification";
    notification.textContent = message;

    const bgColor =
      type === "error" ? "#ef4444" : type === "success" ? "#10b981" : "#0ea5e9";
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1003;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            font-family: 'Noto Sans Georgian', sans-serif;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Initialize checkout when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.checkoutManager = new CheckoutManager();
});

// Handle mobile menu
document.addEventListener("DOMContentLoaded", () => {
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
});
