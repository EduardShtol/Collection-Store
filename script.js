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
        rating:
