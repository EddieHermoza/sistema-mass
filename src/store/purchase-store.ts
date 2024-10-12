
import { ProductPurchase } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartState = {
    cart: ProductPurchase[],

    getTotalProductsQuantity: () => number
    getTotalProductsPrice:() => number
    addProduct: (product: ProductPurchase) => void
    updateProductQuantity: (product: ProductPurchase,quantity:number) => void
    updateProductPrice:(product:ProductPurchase,price:number)=> void
    removeProduct: (product:ProductPurchase) => void
}

export const useCartStore = create<CartState>()(

    persist(

        (set, get) => ({

            cart: [],

            getTotalProductsQuantity: () => {
                const { cart } = get()
                let totalQuantity = 0

                for (let i = 0; i < cart.length; i++) {
                    const quantity = cart[i].quantity
                    totalQuantity+=quantity
                }

                return totalQuantity
            },

            getTotalProductsPrice: ()=>{
                const { cart } = get()
                let totalPrice = 0

                for (let i = 0; i < cart.length; i++) {
                    const price = cart[i].quantity * cart[i].price
                    totalPrice+=price
                }

                return totalPrice
            },


            addProduct: (product: ProductPurchase) => {
                const { cart } = get()

                const inCart = cart.some(
                    (item) => (item.id === product.id)
                )

                if (!inCart) {
                    set({ cart: [...cart, product] })
                    return
                }

                const updatedCart = cart.map((item) => {
                    if (item.id === product.id) {

                        return { ...item, quantity:product.quantity }
                    }
                    return item
                })

                set({ cart: updatedCart })
            },
            updateProductQuantity: (product:ProductPurchase, quantity:number)=>{
                const {cart} = get()
                const updateCartQuantity = cart.map(item => {

                    if (item.id === product.id ) {
                        return {...item,quantity:quantity}
                    }
                    return item 
                }) 

                set({cart:updateCartQuantity})
            },
            updateProductPrice: (product:ProductPurchase, price:number)=>{
                const {cart} = get()
                const updateProductPrice = cart.map(item => {

                    if (item.id === product.id ) {
                        return {...item,price:price}
                    }
                    return item 
                }) 

                set({cart:updateProductPrice})
            },
            removeProduct: (product: ProductPurchase) => {
                const { cart } = get()

                const newCart = cart.filter(item => item.id !== product.id)

                set({ cart: newCart })
            },

        })
        , {
            name: "purchase-cart",
        })


)