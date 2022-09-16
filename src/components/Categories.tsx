import React from "react";
import { useDispatch } from "react-redux";
import { setActiveCategory, setCurrentPage } from "../redux/slices/filterSlice";

type TCategoriesList = {
    id: number;
    name: string;
};

const categories: TCategoriesList[] = [
    { id: 1, name: "Все" },
    { id: 2, name: "Мясные" },
    { id: 3, name: "Вегетарианская" },
    { id: 4, name: "Гриль" },
    { id: 5, name: "Острые" },
    { id: 6, name: "Закрытые" },
];

type TCategoriesProps = {
    activeCategory: number;
};

// React.FC<CategoriesProps> - Таким образом мы автоматически типизируем props , добавив в <наш type>;
const Categories: React.FC<TCategoriesProps> = (props) => {
    const { activeCategory } = props;
    const dispatch = useDispatch();

    const onClickActiveCategory = (id: number): void => {
        dispatch(setActiveCategory(id));
        dispatch(setCurrentPage(1));
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((pizza) => (
                    <li
                        key={pizza.id}
                        onClick={() => onClickActiveCategory(pizza.id)}
                        className={activeCategory === pizza.id ? "active" : ""}>
                        {pizza.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
