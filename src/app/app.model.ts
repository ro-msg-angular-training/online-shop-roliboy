export class Product {
  id: number
  name: string
  category: string
  image: string
  price: number
  description: string

  constructor(
    id: number = 0,
    name: string = '',
    category: string = '',
    image: string = '',
    price: number = 0,
    description: string = ''
  ) {
    this.id = id
    this.name = name
    this.category = category
    this.image = image
    this.price = price
    this.description = description
  }
}

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


export class User {
  username: string
  fullName: string
  roles: string[]

  constructor(
    username: string = '',
    fullName: string = '',
    roles: string[] = []) {
    this.username = username
    this.fullName = fullName
    this.roles = roles
  }
}
