document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. ELEMENT SELECTORS (MUST be at the very top) ---
    const searchInput = document.querySelector('#search');
    const sortSelect = document.querySelector('#sort');
    const grid = document.querySelector('#shop-grid');
    const categoryFilter = document.querySelector("#categoryFilter"); 
    const cartCount = document.querySelector("#cartCount");         
    const cartTotal = document.querySelector("#cartTotal");         

    // --- Cart Modal Selectors ---
    const cartBtn = document.querySelector("#cartBtn");
    const cartModel = document.querySelector("#cartModal");
    const cartItems = document.querySelector("#cartItems");
    const closeCartModel = document.querySelector("#closeCartModal");

    // Exit early if the main product grid is missing
    if (!grid) {
        console.warn('No #shop-grid found on this page. Script stopped.'); 
        return;
    }

    const state = { all: [], filtered: [] };

 
    // 2. DATA FETCHING
   

    const fetchProducts = async () => {
        const url = 'https://shoes-collections.p.rapidapi.com/shoes';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'd375ab4cb4mshd9c8a15aad0181dp102ea1jsn92ca54e1238a',
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            const result = await response.json(); 
            return result; // Correctly returns the fetched data
        } catch (error) {
            console.error('Error fetching shoes:', error);
            return [];
        }
    };

    const fetchCategories = async () => {
        if (!categoryFilter) return;
        try {
            // NOTE: This uses the old API for categories, assuming you want generic filters
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories`);
            const data = await response.json();
            const filteredCategories = data.filter(c => c.id !== 4 && c.name); 
            renderCategories(filteredCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    // 3. RENDERING FUNCTIONS
   

    function renderProducts(items) {
        grid.innerHTML = '';
        if (!items || items.length === 0) {
            grid.innerHTML = '<p class="helper">No items match your criteria.</p>';
            return;
        }

        items.forEach(p => {
            const el = document.createElement('article');
            el.className = 'product-card';

            const imageUrl = p.images[0]; // Uses the first element of the mapped 'images' array
            const price = (typeof p.price === 'number') ? p.price.toFixed(2) : 'N/A';
            const name = p.title || 'Product';
            const brand = p.category && p.category.name ? p.category.name : '—';

            el.innerHTML = `
                <img src="${imageUrl}" alt="${name}" onerror="this.onerror=null;this.src='https://placehold.co/250x250/ccc/fff?text=No+Image';">
                <strong>${name}</strong>
                <div class="rating">⭐ N/A • ${brand}</div>
                <div class="price">$${price}</div>
                <button class="btn primary card-cta" data-product-id="${p.id}">Add to cart</button>
            `;
            grid.appendChild(el);
        });
    }

    function renderCategories(categories) {
        if (!categoryFilter) return;
        
        let options = '<option value="">All Products</option>';
        
        options += categories.map(
            (c) => `<option value="${c.name}">${
                c.name[0].toUpperCase() + c.name.slice(1)
            }</option>`
        ).join('');
        
        categoryFilter.innerHTML = options;
    }


    function renderCart() {
        if (!cartItems) return;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
             localStorage.removeItem("cart"); 
             const cartTotalElement = document.querySelector("#cartTotal");
             if (cartTotalElement) {
                  cartTotalElement.textContent = "$0.00"; 
             }
            cartItems.innerHTML = '<p class="helper-center">Your cart is empty.</p>';
            return;
        }

        cartItems.innerHTML = cart
            .map(
                (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
            `
            )
            .join("");

        // Event delegation for quantity buttons (must be inside renderCart)
        cartItems.querySelectorAll(".quantity-btn").forEach((quantityBtn) => {
            quantityBtn.addEventListener("click", () => {
                const { id, action } = quantityBtn.dataset;
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let cartItem = cart.find((crt) => Number(crt.id) === Number(id));

                if (cartItem) {
                    if (action === "increase") {
                        cartItem.quantity += 1;
                    } else if (action === "decrease") {
                        cartItem.quantity -= 1;
                        if (cartItem.quantity === 0) {
                            cart = cart.filter((crt) => Number(crt.id) !== Number(id));
                        }
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    countItemsInTheCart();
                    renderCart();
                }
            });
        });
    }


  
    // 4. CART UTILITIES
  

    function addToCart(item) {
        let carts = JSON.parse(localStorage.getItem("cart")) || [];
        const itemId = Number(item.id); 

        let existItem = carts.find((cart) => Number(cart.id) === itemId); 

        if (existItem) {
            existItem.quantity += 1;
        } else {
            const newItem = { 
                id: itemId,
                title: item.title,
                price: parseFloat(item.price) || 0, 
                image: item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/200',
                quantity: 1
            };
            carts.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(carts));
        countItemsInTheCart();
    }

    function countItemsInTheCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        if (cartCount) {
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 
            cartCount.textContent = totalItems;
        }
        
        calculateCartItems(); 
    }

    function calculateCartItems() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price || 0), 0);
        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }



    // 5. FILTERS & INITIALIZATION
 

    function applyFilters() {
        let items = [...state.all];
        const term = (searchInput?.value || '').trim().toLowerCase();
        const category = categoryFilter?.value;

        // Search Filter
        if (term) {
            items = items.filter(p => {
                const name = (p.title || '').toLowerCase();
                const brand = (p.category?.name || '').toLowerCase();
                return name.includes(term) || brand.includes(term);
            });
        }
        
        // Category Filter
        if (category) {
            items = items.filter(p => (p.category?.name || '') === category);
        }

        // Sort Filter
        const sort = sortSelect?.value;
        if (sort === 'price-asc') items.sort((a, b) => a.price - b.price); 
        if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);

        state.filtered = items;
        renderProducts(items);
    }

    // --- INITIAL LOAD ---
    try {
        const rawProducts = await fetchProducts();
        
        // 💡 FIX APPLIED: Correctly map the 'name' and 'image' properties from the API data
        const products = rawProducts.map(item => ({
            id: item.id || Math.random(),
            title: item.name || 'Unknown Shoe',
            price: parseFloat(item.price) || 0,
            // ⭐️ CORRECT MAPPING: Uses the 'image' property from your API data
            images: [item.image || 'https://placehold.co/250x250/ccc/fff?text=No+Image'], 
            // Creates a placeholder category name (e.g., uses PUMA if the name contains PUMA)
            category: { name: (item.name || '').toLowerCase().includes('puma') ? 'PUMA' : 'Other' } 
        })).filter(p => p.price > 0); 

        state.all = products || [];
        state.filtered = [...state.all];
        renderProducts(state.filtered);
        fetchCategories(); 
    } catch (e) {
        console.warn('Initialization failed:', e);
        grid.innerHTML = '<p class="helper">Failed to load products.</p>';
    }

    // IMPORTANT: This initializes the cart count when the page loads
    countItemsInTheCart(); 


    // 6. EVENT LISTENERS (ALL listeners go here at the end)
  
    
    // --- Shop Listeners ---
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);


    // --- Event Delegation for "Add to cart" buttons ---
    grid.addEventListener('click', e => {
        const btn = e.target.closest('.card-cta');
        if (!btn) return;

        const productId = Number(btn.dataset.productId);
        const product = state.all.find(p => Number(p.id) === productId);

        if (product) {
            addToCart(product); 
            console.log('Added to cart:', product.title);
        } else {
            console.warn('Product not found for id:', productId);
        }
    });
    
    // Cart Modal Event Listeners
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            if (cartModel) {
                cartModel.classList.add("active");
            }
            renderCart();
        });
    }

    if (closeCartModel) {
        closeCartModel.addEventListener("click", () => {
            if (cartModel) {
                cartModel.classList.remove("active");
            }
        });
    }
});