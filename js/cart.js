/* =========================================
   Cart Management — Sweet Rayne Cottage
   ========================================= */

const CART_KEY = 'src_cart';

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

export function addToCart(product, size, color, quantity = 1) {
  const cart = getCart();
  const key = `${product.id}__${size}__${color}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color,
      quantity,
      gradient: product.gradient,
      emoji: product.emoji,
    });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

export function removeFromCart(key) {
  saveCart(getCart().filter(i => i.key !== key));
}

export function updateQuantity(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

export function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function updateCartBadge() {
  const count = cartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showToast(msg) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Init badge on every page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
