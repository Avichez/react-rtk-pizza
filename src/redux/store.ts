import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/setPizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizzas,
    },
});

// типизируем наш глобал state.
export type RootState = ReturnType<typeof store.getState>;

// типизируем Dispatch.
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
