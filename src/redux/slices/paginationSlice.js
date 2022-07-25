import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pagesCount: 0,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPagesCount: (state, action) => {
            state.pagesCount = Math.ceil(action.payload / 4);
        },
    },
});

export const { setPagesCount } = paginationSlice.actions;

export default paginationSlice.reducer;
