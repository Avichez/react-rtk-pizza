import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import "./scss/app.scss";

const Cart = React.lazy(() => import(/* webpackChunkName: "cart" */ "./pages/Cart"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notFount" */ "./pages/NotFound"));
const PizzaInfo = React.lazy(() => import(/* webpackChunkName: "pizzaInfo" */ "./pages/PizzaInfo"));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <Suspense
                            fallback={
                                <div style={{ textAlign: "center" }}>Идет Загрузка корзины...</div>
                            }>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense
                            fallback={
                                <div style={{ textAlign: "center" }}>Идет Загрузка Пиццы...</div>
                            }>
                            <PizzaInfo />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense
                            fallback={<div style={{ textAlign: "center" }}>Идет Загрузка...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
