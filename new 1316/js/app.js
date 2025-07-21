function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('show');
}
//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// Example: Load products dynamically
async function loadProducts() {
  const snapshot = await db.collection("products").get();
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  snapshot.forEach(doc => {
    const product = doc.data();
    const colors = product.colors || [];
    const colorOptions = colors.map(color => `<option value="${color}">${color}</option>`).join('');
    const image = product.images?.[0] || product.image || "assets/images/default.jpg";

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">₦${product.price.toLocaleString()}</p>
      <button class="toggle-details"> Show Details</button>
      <button class="button" onclick="addToCart('${doc.id}')">Add to Cart</button>
      <div class="product-details">
        <p>${product.description || "No description available."}</p>
        <label>Choose Color: <select class="color-select">${colorOptions}</select></label><br>
        <label>Quantity: <input type="number" min="1" value="1" class="quantity"></label>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

loadProducts();

document.addEventListener('click', function (e) {
    if
    (e.target.classList.contains('toggle-details')) {
        const card = 
        e.target.closest('.product-card');
        const details =
        card.querySelector('.product-details');

        details.classList.toggle('show');
        e.target.textContent = 
        details.classList.contains('show') ? 'Hide Details' : 'Show Details';
    }
})

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

async function addToCart(productId) {
  const doc = await db.collection("products").doc(productId).get();
  const product = doc.data();
  if (!product) return;

  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: product.name, quantity: 1, price: product.price });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
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
  let grandTotal = 0;

  if (cart.length === 0) {
    list.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    grandTotal += itemTotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong><br>
      ₦${item.price.toLocaleString()} × ${item.quantity} = ₦${itemTotal.toLocaleString()}
      <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" class="qty-input" />
      <button onclick="removeFromCart(${index})" class="remove-btn">✖</button>
    `;
    list.appendChild(li);
  });

  // Show grand total
  const totalEl = document.createElement('p');
  totalEl.innerHTML = `<strong>Total:</strong> ₦${grandTotal.toLocaleString()}`;
  list.appendChild(totalEl);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function openAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
  showLogin();
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
  document.getElementById("auth-msg").textContent = "";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  document.querySelectorAll(".auth-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelector(".auth-tab:nth-child(1)").classList.add("active");
}

function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.querySelectorAll(".auth-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelector(".auth-tab:nth-child(2)").classList.add("active");
}

function showAuthMsg(msg, isError = false) {
  const m = document.getElementById("auth-msg");
  m.textContent = msg;
  m.style.color = isError ? "red" : "green";
}

async function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const whatsapp = document.getElementById("reg-whatsapp").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !whatsapp || !password) {
    return showAuthMsg("Fill all fields", true);
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await user.updateProfile({ displayName: name });
    await user.sendEmailVerification();

    await db.collection("users").doc(user.uid).set({ name, email, whatsapp });

    showAuthMsg("Registered! Check your email to verify.");
  } catch (error) {
    showAuthMsg(error.message, true);
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await auth.signOut();
      return showAuthMsg("Please verify your email first.", true);
    }

    showAuthMsg("Login successful! Redirecting...");
    window.location.href = "dashboard.html";
  } catch (error) {
    showAuthMsg(error.message, true);
  }
  const doc = await db.collection("users").doc(user.uid).get();
const role = doc.exists ? doc.data().role : "user";

if (role === "admin") {
  window.location.href = "admin-dashboard.html";
} else {
  window.location.href = "dashboard.html";
}
}

showAuthMsg("Login successful! Redirecting...");
setTimeout(() => {
  window.location.href = "dashboard.html";
}, 1500);


document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  console.log("Message submitted:", { name, email, message });

  document.getElementById("contact-status").textContent = "✅ Message sent! We'll reply as soon as possible.";
  this.reset();
});