document.addEventListener('DOMContentLoaded', async () => {
  // Dynamic greeting
  const hours = new Date().getHours();
  const greet = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
  document.querySelector('#greet').textContent = greet;

  // Show a few products on home from API (DummyJSON)
  try{
    const res = await fetch('https://dummyjson.com/products/category/mens-shoes?limit=4');
    const data = await res.json();
    const list = document.querySelector('#home-grid');
    (data.products || []).forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}">
        <strong>${p.title}</strong>
        <div class="rating">⭐ ${p.rating} • ${p.brand || '—'}</div>
        <div class="price">$${p.price}</div>
        <button class="btn primary card-cta">Add to cart</button>
      `;
      card.querySelector('button').addEventListener('click', ()=>{
        APP.addToCart({id:p.id, title:p.title, price:p.price, image:p.thumbnail});
      });
      list.appendChild(card);
    });
  }catch(e){
    console.warn(e);
    const list = document.querySelector('#home-grid');
    list.innerHTML = '<p class="helper">Could not load new arrivals right now.</p>';
  }
});

