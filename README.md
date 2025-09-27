
Project Name: Shoe Haven 👟
🌟 Overview
Shoe Haven is a single-page, responsive e-commerce application built with vanilla JavaScript. It demonstrates modern front-end concepts like asynchronous data fetching (using the RapidAPI service for product data), state management, client-side filtering/sorting, and persistent cart management using local storage.

✨ Features
Dynamic Product Display: Loads product data from a remote API and renders it efficiently onto a grid.

Persistent Shopping Cart: Users can add, increase, and decrease item quantities. Cart contents and total are saved using Local Storage.

Search & Filter: Instantly filter the product list by name/brand using the search bar.

Sorting: Sort products by price (low-to-high or high-to-low).

Modal View: A dedicated modal displays the current cart items, quantities, and total.

🛠️ Technology Stack
Category	Technology	Purpose
Frontend	HTML5, CSS3, Vanilla JavaScript	Core structure, styling, and client-side logic.
API	RapidAPI (shoes-collections)	Product data (shoes, prices, images).
Category API	api.escuelajs.co	Used to fetch dummy category names for the filter dropdown.
Data Storage	Local Storage	Persists the user's shopping cart state.

Export to Sheets
🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need a modern web browser (Chrome, Firefox, Edge, etc.). No server environment is strictly required for local development, as the project uses client-side JavaScript.

Installation
Clone the repo:

Bash

git clone https://github.com/yourusername/Shoe-Haven.git
cd Shoe-Haven
Open the file:
Simply open the index.html file in your browser.

Bash

open index.html # On macOS
start index.html # On Windows
API Key Configuration (Crucial Step)
The project relies on a private API key for product data. The key is currently hardcoded in script.js, but for security, you should replace it with your own key if you intend to modify the fetching logic.

File: script.js (inside fetchProducts function)

Property: x-rapidapi-key

💡 Usage
The application initializes on page load, fetching products and counting existing items in the cart (if any).

Key Functions in script.js:
Function	Purpose
fetchProducts()	Handles the secure API call and returns normalized product data.
renderProducts(items)	Clears the main grid and dynamically creates product cards.
applyFilters()	Re-runs the search, category, and sort logic based on current user input.
addToCart(item)	Manages the cart state in Local Storage, handling quantity increments.

Export to Sheets
🤝 Contribution
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'feat: Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📞 Contact
Your Name / Project Maintainer – [your-email@example.com]
