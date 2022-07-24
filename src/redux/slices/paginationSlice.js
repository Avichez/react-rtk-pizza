import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    pagesCount: 0,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPagesCount: (state, action) => {
            state.pagesCount = action.payload;
        },
    },
});

export const { setCurrentPage, setPagesCount } = paginationSlice.actions;

export default paginationSlice.reducer;
