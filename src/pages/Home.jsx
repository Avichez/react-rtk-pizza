import React, { useEffect, useState } from 'react';
import Categories from "../components/Catgories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';

const Home = (props) => {
    const { searchInput, currentPage, setCurrentPage } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = React.useState(1);
    const [sortItem, setSortItem] = useState({ id: 1, name: 'популярности', sort: 'rating' });
    const [pageCount, setPageCount] = useState(0);



    // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
    useEffect(() => {
        setLoading(true);
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = activeCategory === 1 ? '' : `&category=${activeCategory}`;
        const order = sortItem.addSort ? `&order=${sortItem.addSort}` : '';

        fetch(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortItem.sort}${order}${category}${search}`)
            .then((response) => response.json())
            .then((data) => {
                data && setItems(data.items);
                setPageCount(Math.ceil(data.count / 4));
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [activeCategory, sortItem, searchInput, currentPage]);

    const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <Sort sortItem={sortItem} setSortItem={setSortItem} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                    : pizzas}
            </div>
            <Pagination setCurrentPage={setCurrentPage} pageCount={pageCount} />
        </div>
    )
}

export default Home