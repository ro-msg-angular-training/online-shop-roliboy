export class CartItem {
  productId: number
  name: string
  category: string
  price: number
  quantity: number

  constructor(
    productId: number = 0,
    name: string = '',
    category: string = '',
    price: number = 0,
    quantity: number = 0
  ) {
    this.productId = productId
    this.name = name
    this.category = category
    this.price = price
    this.quantity = quantity
  }
}