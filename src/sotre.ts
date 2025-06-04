import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (product: Product['id']) => void
    decreaseQuantity: (product: Product['id']) => void
    removeItem: (product: Product['id']) => void
    clearOrder: () => void
}


export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {

        let order: OrderItem[] = []
        if(get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1),
            } : item) 
        }else {
            order = [...get().order , {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                subtotal: product.price * 1,
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1),
            } : item) 
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
        } : item )

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))