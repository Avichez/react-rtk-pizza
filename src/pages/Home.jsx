import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from "react-redux";
import { setPagesCount } from '../redux/slices/paginationSlice';
import { setFilters } from '../redux/slices/filterSlice';

const Home = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { searchInput, } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { activeCategory, sortItems, currentPage } = useSelector((state) => state.filter);


    const fetchPizzas = async () => {
        setLoading(true);
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = activeCategory === 1 ? '' : `&category=${activeCategory}`;
        const order = sortItems.order ? `&order=${sortItems.order}` : '';

        try {
            const response = await axios.get(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortItems.sort}${order}${category}${search}`);
            setItems(response.data.items);
            dispatch(setPagesCount(response.data.count));
        } catch (error) {
            console.log("Catch Error", error);
        } finally {
            setLoading(false);
        }

    }

    // берем данные из url поля и парсим их в параметры, затем передаем через setFilters в наш state обновляя его и загружая контент изходя из полученой ссылки.
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sortBy = sortList.find((obj) => obj.sort === params.sortBy && obj.order === params.order);

            dispatch(setFilters({
                ...params,
                sortBy
            }))
            isSearch.current = true;
        };
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;

        // eslint-disable-next-line
    }, [activeCategory, sortItems, searchInput, currentPage]);

    // вшитие параметров в url будет происходить только при втором и последующих рендарах страницы.
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                page: currentPage,
                sortBy: sortItems.sort,
                order: sortItems.order,
                category: activeCategory,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
        // eslint-disable-next-line
    }, [activeCategory, sortItems, currentPage])


    const pizzas = items.map((item) => <PizzaItem key={item.id} {...item} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} />
                <Sort />
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