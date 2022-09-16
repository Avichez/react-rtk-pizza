import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type TProductPizza = {
    category: number;
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
};

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface IPizzaSliceState {
    items: TProductPizza[];
    pagesCount: number;
    loadingStatus: Status;
}

type TPizzasData = {
    items: TProductPizza[];
    count: number;
};

// Record позволяет нам указать обобщенно какой обьект к нам придет и с какими типами данных.
type TFetchPizzasArgs = Record<string, string | number>;

export const fetchPizzas = createAsyncThunk(
    "pizzas/fetchPizzasByProperty",
    async (params: TFetchPizzasArgs) => {
        const { category, order, sortBy, search, currentPage } = params;
        const { data } = await axios.get<TPizzasData>(
            `https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4${sortBy}${order}${category}${search}`,
        );

        return data;
    },
);

const initialState: IPizzaSliceState = {
    items: [],
    pagesCount: 0,
    loadingStatus: Status.LOADING, // loading | success | error
};

export const setPizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<TProductPizza[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.loadingStatus = Status.LOADING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.pagesCount = Math.ceil(action.payload.count / 4);
            state.loadingStatus = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.pagesCount = 0;
            state.loadingStatus = Status.ERROR;
        });
    },
});

export const pizzasList = (state: RootState) => state.pizzas;

export const { setItems } = setPizzasSlice.actions;

export default setPizzasSlice.reducer;
