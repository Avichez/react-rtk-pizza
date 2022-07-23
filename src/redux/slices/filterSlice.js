import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 1,
    sortItems: {
        id: 1,
        name: "популярности",
        sort: "rating",
    },
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        setSortItem: (state, action) => {
            state.sortItems = action.payload;
        },
    },
});

export const { setActiveCategory, setSortItem } = filterSlice.actions;

export default filterSlice.reducer;
