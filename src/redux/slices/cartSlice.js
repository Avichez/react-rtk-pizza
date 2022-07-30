import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const sameItem = state.items.find((obj) => obj.id === action.payload.id);

            if (sameItem) {
                sameItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        removeItem: (state, action) => {
            const sameItem = state.items.find((obj) => obj.id === action.payload);

            if (sameItem && sameItem.count > 1) {
                sameItem.count--;
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum;
                }, 0);
            }
        },
        cancelItem: (state, action) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const cartSelector = (state) => state.cart;

export const { addItem, removeItem, clearItems, cancelItem } = cartSlice.actions;

export default cartSlice.reducer;
