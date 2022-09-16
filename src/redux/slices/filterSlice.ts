import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TSortItems = {
    id: number;
    name: string;
    sort: "rating" | "price" | "title";
    order?: "asc" | "desc";
};

interface IFilterSliceState {
    searchValue?: string;
    activeCategory: number;
    currentPage: number;
    sortItems: TSortItems;
}

const initialState: IFilterSliceState = {
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
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload;
        },
        setSortItem: (state, action: PayloadAction<TSortItems>) => {
            state.sortItems = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
            state.currentPage = Number(action.payload.currentPage);
            state.activeCategory = Number(action.payload.activeCategory);
            state.sortItems = action.payload.sortItems;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setActiveCategory, setSortItem, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
