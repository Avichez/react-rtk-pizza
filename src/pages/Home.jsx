import React, { useEffect, useState } from 'react';
import Categories from "../components/Catgories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = React.useState(1);
    const [sortItem, setSortItem] = useState({ id: 1, name: 'популярности', sort: 'rating' });
    console.log(sortItem);



    // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
    useEffect(() => {
        setLoading(true);
        fetch(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items?sortBy=${sortItem.sort}${sortItem.addSort ? `&order=${sortItem.addSort}` : ''}
            ${activeCategory === 1 ? '' : `&category=${activeCategory}`}`)
            .then((response) => response.json())
            .then((data) => {
                data && setItems(data);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [activeCategory, sortItem]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <Sort sortItem={sortItem} setSortItem={setSortItem} />
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