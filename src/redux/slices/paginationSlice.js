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
            state.pagesCount = Math.ceil(action.payload / 4);
        },
    },
});

export const { setCurrentPage, setPagesCount } = paginationSlice.actions;

export default paginationSlice.reducer;
