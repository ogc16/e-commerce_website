// This is a simple client-side cart implementation
// In a production app, you might want to use a more robust solution

// Define cart item type
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []

  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

// Save cart to localStorage
export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return

  localStorage.setItem("cart", JSON.stringify(cart))
  // Dispatch event for components to listen to
  window.dispatchEvent(new Event("cart-updated"))
}

// Add item to cart
export function addToCart(item: CartItem) {
  const cart = getCart()
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id)

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity
  } else {
    // Add new item
    cart.push(item)
  }

  saveCart(cart)
  return cart
}

// Update item quantity
export function updateCartItemQuantity(id: string, quantity: number) {
  const cart = getCart()
  const itemIndex = cart.findIndex((item) => item.id === id)

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity
    }

    saveCart(cart)
  }

  return cart
}

// Remove item from cart
export function removeFromCart(id: string) {
  const cart = getCart()
  const updatedCart = cart.filter((item) => item.id !== id)

  saveCart(updatedCart)
  return updatedCart
}

// Clear cart
export function clearCart() {
  saveCart([])
  return []
}

// Get cart total
export function getCartTotal() {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Get cart item count
export function getCartCount() {
  if (typeof window === "undefined") return 0

  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

