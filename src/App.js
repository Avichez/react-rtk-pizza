import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Catgories";
import Sort from "./components/Sort";
import PizzaItem from "./components/PizzaItem";
// import pizzas from "./assets/pizzas.json";
import { useEffect, useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
  useEffect(() => {
    fetch("https://62a8c6edec36bf40bdadcca5.mockapi.io/items")
      .then((response) => response.json())
      .then((data) => {
        data && setItems(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => (
              <PizzaItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
