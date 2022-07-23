import React, { useEffect, useState } from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector } from "react-redux";

const Home = (props) => {
    const { searchInput, } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [pagesCount, setPagsCount] = useState(0);
    const currentPage = useSelector(state => state.pagination.currentPage);
    const { activeCategory, sortItems } = useSelector((state) => state.filter);


    // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
    useEffect(() => {
        setLoading(true);
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = activeCategory === 1 ? '' : `&category=${activeCategory}`;
        const order = sortItems.order ? `&order=${sortItems.order}` : '';

        fetch(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortItems.sort}${order}${category}${search}`)
            .then((response) => response.json())
            .then((data) => {
                data && setItems(data.items);
                setPagsCount(Math.ceil(data.count / 4));
                setLoading(false);
            });
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [activeCategory, sortItems, searchInput, currentPage]);

    const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} />
                <Sort sortItems={sortItems} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                    : pizzas}
            </div>
            <Pagination pagesCount={pagesCount} />
        </div>
    )
}

export default Home