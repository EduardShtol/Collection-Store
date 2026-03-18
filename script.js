// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentTheme = localStorage.getItem('theme') || 'light';

// ===== БАЗА ДАННЫХ ТОВАРОВ =====
const products = [
    {
        id: 1,
        name: 'Treasure Hunt',
        price: 599,
        image: 'cars/1treasurehunt.jpg',
        category: 'treasure',
        description: 'Редкая коллекционная модель',
        rating: 4.8,
        reviews: 15
    },
    {
        id: 2,
        name: 'BMW M3 E46',
        price: 1290,
        image: 'cars/2RLK_BMW_M3_E46.jpg',
        category: 'rlk',
        description: 'Red line club, лимитированная серия',
        rating: 4.9,
        reviews: 23
    },
    {
        id: 3,
        name: 'Nissan Skyline R34',
        price: 1990,
        image: 'cars/3RLK_NISSAN SKYLINE R34.jpg',
        category: 'rlk',
        description: 'Red line club',
        rating: 5.0,
        reviews: 31
    },
    {
        id: 4,
        name: 'Dodge Charger RT',
        price: 1990,
        image: 'cars/4RLK_DODGE CHARGERRT.jpg',
        category: 'rlk',
        description: 'Red line club',
        rating: 4.7,
        reviews: 12
    },
    {
        id: 5,
        name: 'Mitsubishi Lancer Evo',
        price: 10990,
        image: 'cars/5PRSPEC_Mitsubishi Lancer Evolution.jpg',
        category: 'premium',
        description: 'Premium Special',
        rating: 5.0,
        reviews: 8
    },
    {
        id: 6,
        name: 'Honda S2000 Premium',
        price: 10990,
        image: 'cars/6PRSPEC_Honda S2000.jpg',
        category: 'premium',
        description: 'Premium Special',
        rating: 4.9,
        reviews: 11
    },
    {
        id: 7,
        name: 'Honda S2000 Special',
        price: 7990,
        image: 'cars/7SPEC_Honda s2000.jpg',
        category: 'special',
        description: 'Special edition',
        rating: 4.6,
        reviews: 7
    },
    {
        id: 8,
        name: 'Nissan Skyline GTR 34',
        price: 2990,
        image: 'cars/10prem2Nissan Skyline GTR 34.jpg',
        category: 'premium',
        description: 'Premium edition',
        rating: 4.8,
        reviews: 19
    },
    {
        id: 9,
        name: 'Ferrari F40',
        price: 999,
        image: 'cars/11Ferrari F40.jpg',
        category: 'standard',
        description: 'Классическая модель',
        rating: 4.5,
        reviews: 42
    },
    {
        id: 10,
        name: 'Chevrolet Impala 64',
        price: 999,
        image: 'cars/12Chevrolet Impala 64.jpg',
        category: 'standard',
        description: 'Классический американский автомобиль',
        rating: 4.7,
        reviews: 28
    },
    {
        id: 11,
        name: 'Audi RS6',
        price: 999,
        image: 'cars/13Audi RS6.jpg',
        category: 'standard',
        description: 'Немецкий универсал',
        rating: 4.6,
        reviews: 17
    },
    {
        id: 12,
        name: 'Ferrari SF90',
        price: 999,
        image: 'cars/14Ferrari SF90.jpg',
        category: 'standard',
        description: 'Гибридный суперкар',
        rating: 4.9,
        reviews: 9
    },
    {
        id: 13,
        name: 'Ferrari F40 (2)',
        price: 999,
        image: 'cars/15Ferrari F40.jpg',
        category: 'standard',
        description: 'Классическая модель',
        rating: 4.5,
        reviews: 42
    },
    {
        id: 14,
        name: 'Ferrari 12 Cilindri',
        price: 999,
        image: 'cars/16Ferrari 12cilindri.jpg',
        category: 'standard',
        description: 'Новая модель',
        rating: 5.0,
        reviews: 5
    }
];

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', function() {
    // Убираем загрузочную анимацию
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) loading.style.display = 'none';
    }, 1000);

    // Устанавливаем тему
    setTheme(currentTheme);

    // Обновляем счетчики
    updateCounters();

    // Инициализируем компоненты в зависимости от страницы
    if (document.querySelector('.catalog-page')) {
        initCatalog();
    }
    
    if (document.querySelector('.product-page')) {
        initProductPage();
    }
    
    if (document.querySelector('.cart-page')) {
        initCartPage();
    }
    
    if (document.querySelector('.favorites-page')) {
        initFavoritesPage();
    }

    // Инициализируем чат
    initChat();

    // Добавляем обработчики для кнопок
    setupEventListeners();
});

// ===== НАСТРОЙКА ОБРАБОТЧИКОВ =====
function setupEventListeners() {
    // Кнопка темы
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Поиск
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Фильтры
    const filterCategory = document.getElementById('filterCategory');
    const filterSort = document.getElementById('filterSort');
    
    if (filterCategory) {
        filterCategory.addEventListener('change', applyFilters);
    }
    
    if (filterSort) {
        filterSort.addEventListener('change', applyFilters);
    }

    // Кнопки "Наверх" и "На главную"
    document.querySelectorAll('.back-to-home').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.getAttribute('href') === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    });
}

// ===== РАБОТА С ТЕМОЙ =====
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    } else {
        document.body.classList.remove('dark-theme');
        document.querySelector('.theme-toggle i').className = 'fas fa-moon';
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== РАБОТА С КОРЗИНОЙ =====
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
    showNotification(`${product.name} добавлен в корзину!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
    
    if (document.querySelector('.cart-page')) {
        renderCart();
    }
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            if (document.querySelector('.cart-page')) {
                renderCart();
            }
        }
    }
    updateCounters();
}

function updateCounters() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
        el.style.display = cartCount > 0 ? 'flex' : 'none';
    });

    const favCount = favorites.length;
    document.querySelectorAll('.favorites-count').forEach(el => {
        el.textContent = favCount;
        el.style.display = favCount > 0 ? 'flex' : 'none';
    });
}

// ===== РАБОТА С ИЗБРАННЫМ =====
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    const product = products.find(p => p.id === productId);
    
    if (index === -1) {
        favorites.push(productId);
        showNotification(`${product.name} добавлен в избранное!`);
    } else {
        favorites.splice(index, 1);
        showNotification(`${product.name} удален из избранного`, 'info');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateCounters();
    
    // Обновляем иконки на странице
    document.querySelectorAll(`.favorite-btn[data-id="${productId}"]`).forEach(btn => {
        btn.classList.toggle('active');
        btn.innerHTML = index === -1 ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    });
}

function isFavorite(productId) {
    return favorites.includes(productId);
}

// ===== КАТАЛОГ =====
function initCatalog() {
    renderProducts(products);
}

function renderProducts(productsToRender) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = productsToRender.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <div class="rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="price">${product.price.toLocaleString()} ₽</p>
                <div class="card-buttons">
                    <button class="card-btn favorite-btn ${isFavorite(product.id) ? 'active' : ''}" 
                            data-id="${product.id}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        <i class="${isFavorite(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="card-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return `<div class="stars">${stars}</div>`;
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

function applyFilters() {
    const category = document.getElementById('filterCategory')?.value;
    const sort = document.getElementById('filterSort')?.value;
    
    let filtered = [...products];
    
    // Фильтр по категории
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Сортировка
    if (sort) {
        switch(sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    renderProducts(filtered);
}

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

// ===== СТРАНИЦА ТОВАРА =====
function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'catalog.html';
        return;
    }
    
    renderProductPage(product);
}

function renderProductPage(product) {
    document.getElementById('productImage').src = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price.toLocaleString()} ₽`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productRating').innerHTML = generateStars(product.rating);
    document.getElementById('ratingCount').textContent = `${product.reviews} отзывов`;
    
    // Загружаем похожие товары
    loadSimilarProducts(product);
    
    // Обработчики кнопок
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, quantity);
    });
    
    document.getElementById('favoriteBtn').addEventListener('click', () => {
        toggleFavorite(product.id);
    });
    
    // Обработчики количества
    document.getElementById('decreaseQty').addEventListener('click', () => {
        const input = document.getElementById('quantity');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    });
    
    document.getElementById('increaseQty').addEventListener('click', () => {
        const input = document.getElementById('quantity');
        input.value = parseInt(input.value) + 1;
    });
}

function loadSimilarProducts(product) {
    const similar = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    
    const container = document.getElementById('similarProducts');
    container.innerHTML = similar.map(p => `
        <div class="col-md-3 col-sm-6">
            <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
                <img src="${p.image}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p class="price">${p.price.toLocaleString()} ₽</p>
            </div>
        </div>
    `).join('');
}

// ===== КОРЗИНА =====
function initCartPage() {
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-shopping-cart"></i>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары в корзину, чтобы оформить заказ</p>
                <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
            </div>
        `;
        if (summary) summary.style.display = 'none';
        return;
    }
    
    if (summary) summary.style.display = 'block';
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₽</div>
            </div>
            <div class="cart-item-quantity">
                <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                <strong>${(item.price * item.quantity).toLocaleString()} ₽</strong>
            </div>
            <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `${total.toLocaleString()} ₽`;
}

// ===== ИЗБРАННОЕ =====
function initFavoritesPage() {
    const container = document.getElementById('favoritesContainer');
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <i class="far fa-heart"></i>
                <h3>В избранном пока пусто</h3>
                <p>Добавляйте понравившиеся модели в избранное</p>
                <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
            </div>
        `;
        return;
    }
    
    const favoriteProducts = products.filter(p => favorites.includes(p.id));
    
    container.innerHTML = favoriteProducts.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString()} ₽</p>
                <div class="card-buttons">
                    <button class="card-btn favorite-btn active" 
                            data-id="${product.id}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="card-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== ЧАТ ПОДДЕРЖКИ =====
function initChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatToggle) return;
    
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
    });
    
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Добавляем сообщение пользователя
        addMessage(text, 'user');
        chatInput.value = '';
        
        // Ответ поддержки
        setTimeout(() => {
            addMessage('Спасибо за сообщение! Мы ответим вам в ближайшее время.', 'support');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `message ${sender}`;
        message.innerHTML = `<div class="message-bubble">${text}</div>`;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// ===== ХЛЕБНЫЕ КРОШКИ =====
function updateBreadcrumbs() {
    const path = window.location.pathname.split('/').pop();
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    let html = '<li class="breadcrumb-item"><a href="index.html">Главная</a></li>';
    
    switch(path) {
        case 'catalog.html':
            html += '<li class="breadcrumb-item active">Каталог</li>';
            break;
        case 'product.html':
            html += '<li class="breadcrumb-item"><a href="catalog.html">Каталог</a></li>';
            html += '<li class="breadcrumb-item active">Товар</li>';
            break;
        case 'cart.html':
            html += '<li class="breadcrumb-item active">Корзина</li>';
            break;
        case 'favorites.html':
            html += '<li class="breadcrumb-item active">Избранное</li>';
            break;
    }
    
    breadcrumb.innerHTML = html;
}

// ===== БЕСКОНЕЧНАЯ ПРОКРУТКА =====
let currentPage = 1;
let loading = false;

window.addEventListener('scroll', () => {
    if (document.querySelector('.catalog-page')) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            if (!loading) {
                loading = true;
                loadMoreProducts();
            }
        }
    }
});

function loadMoreProducts() {
    // Имитация загрузки
    setTimeout(() => {
        currentPage++;
        loading = false;
    }, 1000);
}

// ===== ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ИСПОЛЬЗОВАНИЯ =====
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleFavorite = toggleFavorite;
