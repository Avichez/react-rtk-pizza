import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
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
            state.currentPage = Number(action.payload.page);
            state.activeCategory = Number(action.payload.category);
            state.sortItems = action.payload.sortBy;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const filterSelector = (state) => state.filter;

export const { setActiveCategory, setSortItem, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
