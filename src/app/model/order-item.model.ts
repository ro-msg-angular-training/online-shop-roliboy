export class OrderItem {
  productId: number
  quantity: number

  constructor(
    productId: number = 0,
    quantity: number = 0
  ) {
    this.productId = productId
    this.quantity = quantity
  }
}