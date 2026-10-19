function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }

  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = existing ? existing.quantity + quantity : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item,
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }

  const item = cart.find(({ id }) => id === productId);
  if (!item) {
    return cart;
  }

  if (quantity > item.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return cart.map((cartItem) =>
    cartItem.id === productId ? { ...cartItem, quantity } : cartItem,
  );
}

function removeFromCart(cart, productId) {
  if (!cart.some(({ id }) => id === productId)) {
    return cart;
  }

  return cart.filter(({ id }) => id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promoCode === 'SAVE10' && subtotal >= 20000 ? Math.floor(subtotal * 0.1) : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
