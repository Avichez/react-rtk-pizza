import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaItem from "../components/PizzaItems";
import Skeleton from "../components/PizzaItems/Skeleton";
import Pagination from "../components/Pagination";
import { setFilters, filterSelector } from "../redux/slices/filterSlice";
import { fetchPizzas, pizzasList } from "../redux/slices/setPizzaSlice";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { items, loadingStatus } = useSelector(pizzasList);
    const { activeCategory, sortItems, currentPage, searchValue } = useSelector(filterSelector);

    const getPizzas = async () => {
        const search = searchValue ? `&search=${searchValue}` : "";
        const category = activeCategory === 1 ? "" : `&category=${activeCategory}`;
        const order = sortItems.order ? `&order=${sortItems.order}` : "";
        const sortBy = sortItems.sort ? `&sortBy=${sortItems.sort}` : "";

        dispatch(
            // @ts-ignore
            fetchPizzas({ category, order, sortBy, search, currentPage }),
        ); // to fix it later on
    };

    // берем данные из url поля и парсим их в параметры, затем передаем через setFilters в наш state обновляя его и отображая контент в соответствии.
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sortItems = sortList.find(
                (obj) => obj.sort === params.sortBy && obj.order === params.order,
            );

            dispatch(
                setFilters({
                    currentPage: Number(params.page),
                    activeCategory: Number(params.category),
                    sortItems: sortItems ? sortItems : sortList[0],
                }),
            );
            isSearch.current = true;
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

        // eslint-disable-next-line
    }, [activeCategory, sortItems, searchValue, currentPage]);

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
    }, [activeCategory, sortItems, currentPage]);

    const pizzas = items.map((item: any) => <PizzaItem key={item.id} {...item} />); // to fix later on

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {loadingStatus === "error" ? (
                <div className="content__error">
                    <h2>
                        Произошла ошибка <span>😕</span>
                    </h2>
                    <p>
                        К сожалению не удалось получить пиццы
                        <br />
                        Пожалуйста повторите попытку.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {loadingStatus === "loading"
                        ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                        : pizzas}
                </div>
            )}
            <Pagination />
        </div>
    );
};

export default Home;
