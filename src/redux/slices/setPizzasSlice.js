import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const setPizzasSlice = createSlice({
    name: "Pizzas",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setItems } = setPizzasSlice.actions;

export default setPizzasSlice.reducer;
