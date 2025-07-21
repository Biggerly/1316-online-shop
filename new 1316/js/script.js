function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('show');
}

// Example: Load products dynamically
const products = [
  { name: "Smart Watch X1", image: "assets/images/watch.jpg", price: 25000 },
  { name: "AirPods Pro", image: "assets/images/airpods.jpg", price: 18000 },
  { name: "Boom Box Z", image: "assets/images/boombox.jpg", price: 22000 },
  // Add more products with prices
   { name: "Smart Watch X1", image: "assets/images/watch.jpg" },
  { name: "AirPods Pro", image: "assets/images/airpods.jpg" },
  { name: "Boom Box Z", image: "assets/images/boombox.jpg" },
   { name: "Smart Watch X1", image: "assets/images/watch.jpg" },
  { name: "AirPods Pro", image: "assets/images/airpods.jpg" },
  { name: "Boom Box Z", image: "assets/images/boombox.jpg" },
   { name: "Smart Watch X1", image: "assets/images/watch.jpg" },
  { name: "AirPods Pro", image: "assets/images/airpods.jpg" },
  { name: "Boom Box Z", image: "assets/images/boombox.jpg" },
  { name: "Smart Watch X1", image: "assets/images/watch.jpg" },
  // Add up to 50 products here
];

const productGrid = document.getElementById('productGrid');

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <button class="button" onclick="addToCart('${product.name}')">Add to Cart</button>
  `;
  document.getElementById('productGrid').appendChild(card);
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('theme-icon');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
}

// Load cart from localStorage if available
let cart = [];

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  updateCartCount();
}

function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  if (!product) return;

  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: product.name, quantity: 1, price: product.price });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function toggleCartPreview() {
  const preview = document.getElementById('cart-preview');
  preview.classList.toggle('hidden');
  renderCartItems();
}

function renderCartItems() {
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  if (cart.length === 0) {
    list.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} × ${item.quantity}
      <button onclick="removeFromCart(${index})" class="remove-btn">✖</button>
    `;
    list.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}