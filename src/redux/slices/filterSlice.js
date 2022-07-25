import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 1,
    currentPage: 1,
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
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            console.log(action.payload);
            state.currentPage = Number(action.payload.page);
            state.activeCategory = Number(action.payload.category);
            state.sortItems = action.payload.sortBy;
        },
    },
});

export const { setActiveCategory, setSortItem, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
