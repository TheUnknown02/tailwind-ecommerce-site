import { brands, products } from './data.js';
// DOM Elements
const brandGrid = document.getElementById('brand-grid');
const productGrid = document.getElementById('product-grid');
const themeToggle = document.getElementById('theme-toggle');
const brandTitle = document.getElementById('brand-title');
const brandDesc = document.getElementById('brand-desc');
const brandLogo = document.getElementById('brand-logo');
// Theme Handling
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
    }
}
themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
    else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
});
// Render Brands (Homepage)
function renderBrands() {
    if (!brandGrid)
        return;
    brandGrid.innerHTML = brands.map(brand => `
        <a href="brand.html?id=${brand.id}" class="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative h-64 overflow-hidden">
                <img src="${brand.coverImage}" alt="${brand.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                    <h3 class="text-2xl font-serif font-bold mb-1">${brand.name}</h3>
                    <p class="text-sm opacity-90">${brand.categories.join(', ')}</p>
                </div>
            </div>
            <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">${brand.description}</p>
                <div class="mt-4 flex items-center text-brand-gold font-medium text-sm">
                    Explore Collection
                    <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </div>
            </div>
        </a>
    `).join('');
}
// Render Brand Details (Brand Page)
function renderBrandDetails() {
    const params = new URLSearchParams(window.location.search);
    const brandId = params.get('id');
    if (!brandId) {
        if (window.location.pathname.includes('brand.html')) {
            window.location.href = 'index.html';
        }
        return;
    }
    const brand = brands.find(b => b.id === brandId);
    if (!brand)
        return;
    // Update Header
    if (brandTitle)
        brandTitle.textContent = brand.name;
    if (brandDesc)
        brandDesc.textContent = brand.description;
    if (brandLogo)
        brandLogo.src = brand.logo;
    // Filter and Render Products
    if (productGrid) {
        const brandProducts = products.filter(p => p.brandId === brandId);
        if (brandProducts.length === 0) {
            productGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">No products available yet.</p>';
            return;
        }
        productGrid.innerHTML = brandProducts.map(product => `
            <div class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300">
                <div class="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    <button class="absolute bottom-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </button>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">${product.name}</h3>
                    <p class="text-brand-gold font-bold">${product.price}</p>
                </div>
            </div>
        `).join('');
    }
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderBrands();
    renderBrandDetails();
});
