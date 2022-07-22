import "./scss/app.scss";
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

export const SearchContext = React.createContext();

const App = () => {
    const [searchInput, setSearchInput] = useState("");
    console.log(searchInput);

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchInput, setSearchInput }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
