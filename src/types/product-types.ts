export type Product= {
    id: number,
    name: string,
    price: number,
    category:string,
    stock: number,
    description: string,
    provider:string,
    status: number,
  }

  export type CartProduct={
    id:number,
    name:string,
    price:number,
    discount:number,
    maxQuantity:number,
    quantity:number,

  }