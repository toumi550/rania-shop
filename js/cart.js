// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Produit ajouté au panier!');
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
    showNotification('Produit retiré du panier!');
}

// Function to update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCartToStorage();
    }
}

// Function to get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Function to update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// Function to update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = getCartItemCount();
}

// Function to update cart items display
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Votre panier est vide</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} DA</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    Supprimer
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Function to update cart total
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = getCartTotal().toLocaleString() + ' DA';
}

// Function to toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Function to save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to clear cart
function clearCart() {
    cart = [];
    updateCartUI();
    saveCartToStorage();
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide!');
        return;
    }
    
    toggleCart();
    openCheckoutModal();
}

// Function to open checkout modal
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('overlay');
    
    updateCheckoutItems();
    updateCheckoutTotal();
    
    checkoutModal.style.display = 'flex';
    overlay.classList.add('active');
}

// Function to close checkout modal
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('overlay');
    
    checkoutModal.style.display = 'none';
    overlay.classList.remove('active');
}

// Function to update checkout items
function updateCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${item.title} x ${item.quantity}</span>
            <span>${(item.price * item.quantity).toLocaleString()} DA</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
}

// Function to update checkout total
function updateCheckoutTotal() {
    const checkoutTotal = document.getElementById('checkout-total');
    checkoutTotal.textContent = getCartTotal().toLocaleString() + ' DA';
}

// Function to handle checkout form submission
function handleCheckoutSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            wilaya: formData.get('wilaya'),
            postalCode: formData.get('postalCode'),
            note: formData.get('note')
        },
        items: cart,
        total: getCartTotal(),
        paymentMethod: formData.get('payment'),
        orderDate: new Date().toISOString()
    };
    
    // Save order to localStorage (in real app, send to server)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    clearCart();
    
    // Close modal
    closeCheckoutModal();
    
    // Show success message
    showNotification('Commande passée avec succès! Nous vous contacterons bientôt.', 'success');
    
    // Reset form
    event.target.reset();
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 4000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Add checkout form event listener
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmission);
    }
    
    // Close modals when clicking overlay
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function() {
        toggleCart();
        closeCheckoutModal();
        closeProductModal();
    });
});

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);