import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from "react-redux";
import { setPagesCount } from '../redux/slices/paginationSlice';
import { setFilters } from '../redux/slices/filterSlice';

const Home = (props) => {
    const navigate = useNavigate();
    const { searchInput, } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { activeCategory, sortItems, currentPage } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.search) { // берем данные из url поля и парсим их
            const params = qs.parse(window.location.search.substring(1));

            const sortBy = sortList.find((obj) => obj.sort === params.sortBy && obj.order === params.order);

            dispatch(setFilters({
                ...params,
                sortBy
            }))
        };
        // eslint-disable-next-line
    }, [])


    // https://62a8c6edec36bf40bdadcca5.mockapi.io/items
    useEffect(() => {
        setLoading(true);
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = activeCategory === 1 ? '' : `&category=${activeCategory}`;
        const order = sortItems.order ? `&order=${sortItems.order}` : '';

        axios.get(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortItems.sort}${order}${category}${search}`)
            .then((res) => {
                setItems(res.data.items);
                dispatch(setPagesCount(res.data.count));
                setLoading(false);
            });
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [activeCategory, sortItems, searchInput, currentPage]);

    useEffect(() => {
        const queryString = qs.stringify({
            page: currentPage,
            sortBy: sortItems.sort,
            order: sortItems.order,
            category: activeCategory,
        });

        navigate(`?${queryString}`);
        // eslint-disable-next-line
    }, [activeCategory, sortItems, currentPage])

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
            <Pagination />
        </div>
    )
}

export default Home