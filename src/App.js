import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
    const [searchInput, setSearchInput] = useState("");
    console.log(searchInput);

    return (
        <div className="wrapper">
            <Header searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home searchInput={searchInput} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
