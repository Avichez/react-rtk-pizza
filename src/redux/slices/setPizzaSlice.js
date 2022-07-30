import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchByProperties", async (params) => {
    const { category, order, sortBy, search, currentPage } = params;
    const { data } = await axios.get(
        `https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4${sortBy}${order}${category}${search}`,
    );
    return data;
});

const initialState = {
    items: [],
    pagesCount: 0,
};

export const setPizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.pagesCount = Math.ceil(action.payload.count / 4);
        });
    },
});

export const { setItems } = setPizzasSlice.actions;

export default setPizzasSlice.reducer;
