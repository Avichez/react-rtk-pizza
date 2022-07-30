import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzasByProperty", async (params) => {
    const { category, order, sortBy, search, currentPage } = params;
    const { data } = await axios.get(
        `https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4${sortBy}${order}${category}${search}`,
    );
    return data;
});

const initialState = {
    items: [],
    pagesCount: 0,
    loadingStatus: "loading", // loading | success | error
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
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.pagesCount = 0;
            state.loadingStatus = "loading";
            console.log("Ожидание");
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.pagesCount = Math.ceil(action.payload.count / 4);
            state.loadingStatus = "success";
            console.log("Пришел ответ");
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.pagesCount = 0;
            state.loadingStatus = "error";
            console.log("Ошибка!");
        });
    },
});

export const { setItems } = setPizzasSlice.actions;

export default setPizzasSlice.reducer;
