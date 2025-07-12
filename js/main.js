// Main JavaScript functionality

// Smooth scrolling for navigation links
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Product modal functionality
let currentProduct = null;

function openProductModal(productId) {
    currentProduct = getProductById(productId);
    if (!currentProduct) return;
    
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('overlay');
    
    // Update modal content
    document.getElementById('modal-product-title').textContent = currentProduct.title;
    document.getElementById('modal-product-price').textContent = currentProduct.price.toLocaleString() + ' DA';
    document.getElementById('modal-product-description').textContent = currentProduct.description;
    
    // Update main image
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.title;
    
    // Update thumbnail images
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.innerHTML = '';
    
    currentProduct.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = currentProduct.title;
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => changeMainImage(image, thumbnail);
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Reset quantity
    document.getElementById('modal-quantity').value = 1;
    
    // Show modal
    modal.style.display = 'flex';
    overlay.classList.add('active');
    
    // Initialize image zoom
    initializeImageZoom();
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'none';
    overlay.classList.remove('active');
    currentProduct = null;
}

function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function addToCartFromModal() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    addToCart(currentProduct.id, quantity);
    closeProductModal();
}

// Image zoom functionality
function initializeImageZoom() {
    const mainImage = document.getElementById('modal-main-image');
    const zoomLens = document.querySelector('.zoom-lens');
    
    mainImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate lens position
        const lensWidth = 100;
        const lensHeight = 100;
        
        const lensX = x - lensWidth / 2;
        const lensY = y - lensHeight / 2;
        
        // Position the lens
        zoomLens.style.left = lensX + 'px';
        zoomLens.style.top = lensY + 'px';
        zoomLens.style.width = lensWidth + 'px';
        zoomLens.style.height = lensHeight + 'px';
        zoomLens.style.display = 'block';
        
        // Scale the image
        const scaleX = x / rect.width;
        const scaleY = y / rect.height;
        
        this.style.transformOrigin = `${scaleX * 100}% ${scaleY * 100}%`;
        this.style.transform = 'scale(2)';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        zoomLens.style.display = 'none';
        this.style.transform = 'scale(1)';
    });
}

// Search functionality
function initializeSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher des produits...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        width: 300px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1001;
        display: none;
    `;
    
    searchIcon.style.position = 'relative';
    searchIcon.appendChild(searchInput);
    
    searchIcon.addEventListener('click', function() {
        searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
        if (searchInput.style.display === 'block') {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredProducts);
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchIcon.contains(e.target)) {
            searchInput.style.display = 'none';
        }
    });
}

function displaySearchResults(filteredProducts) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; color: #666;">Aucun produit trouvé</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                message: formData.get('message') || this.querySelector('textarea').value,
                date: new Date().toISOString()
            };
            
            // Save to localStorage (in real app, send to server)
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            // Show success message
            showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize search
    initializeSearch();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize header scroll effect
    initializeHeaderScroll();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
});

// Utility function to format currency
function formatCurrency(amount) {
    return amount.toLocaleString() + ' DA';
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function to validate phone number (Algerian format)
function validatePhone(phone) {
    const re = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}