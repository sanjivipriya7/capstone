export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(item: CartItem) {
  const cart = getCart()
  const existingItem = cart.find((i) => i.id === item.id)

  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  saveCart(cart)
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id)
  saveCart(cart)
}
