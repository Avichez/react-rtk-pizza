import React, { useEffect, useState } from 'react';
import Categories from "../components/Catgories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
    useEffect(() => {
        fetch("https://62a8c6edec36bf40bdadcca5.mockapi.io/items")
            .then((response) => response.json())
            .then((data) => {
                data && setItems(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                    : items.map((item) => <PizzaItem key={item.id} {...item} />)}
            </div>
        </div>
    )
}

export default Home