import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    items: [],
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            const existence = state.cart.find((item) => item.id === action.payload.id);
            existence ? state.cart = state.cart.map((pro) => pro.id === action.payload.id ? { ...pro, count: pro.count + action.payload.count } : pro)
                : state.cart = [...state.cart, action.payload]
        },
        removeFromCart: (state, action) => {
            console.log('1111 remove:', action.payload);
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => item.id === action.payload.id ? { ...item, count: item.count + 1 } : item)
        },
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => (item.id === action.payload.id && item.count > 1) ? { ...item, count: item.count - 1 } : item)
        }
    },
},
)

export const { setIsCartOpen, setItems, addToCart, removeFromCart, increaseCount, decreaseCount } = cartSlice.actions
export default cartSlice.reducer