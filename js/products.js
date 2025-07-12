// Products data
const products = [
    {
        id: 1,
        title: "Smartphone Samsung Galaxy",
        price: 45000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
            "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400",
            "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=400"
        ],
        description: "Smartphone dernière génération avec écran AMOLED, appareil photo haute résolution et batterie longue durée."
    },
    {
        id: 2,
        title: "Robe Élégante",
        price: 8500,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
            "https://images.unsplash.com/photo-1566479179817-c0c8b9f5b8b7?w=400"
        ],
        description: "Robe élégante parfaite pour toutes occasions spéciales. Tissu de haute qualité et coupe moderne."
    },
    {
        id: 3,
        title: "Casque Audio Bluetooth",
        price: 12000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400"
        ],
        description: "Casque audio sans fil avec réduction de bruit active et autonomie de 30 heures."
    },
    {
        id: 4,
        title: "Lampe de Bureau LED",
        price: 3500,
        category: "home",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
        ],
        description: "Lampe de bureau moderne avec éclairage LED ajustable et design minimaliste."
    },
    {
        id: 5,
        title: "Palette de Maquillage",
        price: 6500,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        images: [
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
            "https://images.unsplash.com/photo-1583241800698-9c2e8e6b9b3f?w=400"
        ],
        description: "Palette de maquillage professionnelle avec 24 couleurs vibrantes et longue tenue."
    },
    {
        id: 6,
        title: "Montre Connectée",
        price: 25000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400"
        ],
        description: "Montre connectée avec suivi de santé, GPS intégré et résistance à l'eau."
    },
    {
        id: 7,
        title: "Sac à Main Cuir",
        price: 15000,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"
        ],
        description: "Sac à main en cuir véritable avec finitions élégantes et compartiments multiples."
    },
    {
        id: 8,
        title: "Coussin Décoratif",
        price: 2500,
        category: "home",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400"
        ],
        description: "Coussin décoratif en tissu premium avec motifs modernes pour votre salon."
    },
    {
        id: 9,
        title: "Parfum Femme",
        price: 9500,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400"
        ],
        description: "Parfum féminin aux notes florales et fruitées, longue tenue et élégant."
    },
    {
        id: 10,
        title: "Chaussures Sport",
        price: 18000,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400"
        ],
        description: "Chaussures de sport confortables avec technologie de amortissement avancée."
    },
    {
        id: 11,
        title: "Tablette Android",
        price: 35000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
            "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400"
        ],
        description: "Tablette Android 10 pouces avec processeur rapide et écran haute résolution."
    },
    {
        id: 12,
        title: "Vase Décoratif",
        price: 4500,
        category: "home",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
        ],
        description: "Vase décoratif en céramique artisanale pour embellir votre intérieur."
    }
];

// Function to load products
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-overlay">
                <button class="quick-view-btn" onclick="openProductModal(${product.id})">
                    Aperçu rapide
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">${product.price.toLocaleString()} DA</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Ajouter au panier
            </button>
        </div>
    `;
    return card;
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Load products for selected category
            const category = this.getAttribute('data-category');
            loadProducts(category);
        });
    });
});