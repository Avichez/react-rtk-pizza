import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSortItem, filterSelector } from "../redux/slices/filterSlice";

type TSortList = {
    id: number;
    name: string;
    sort: "rating" | "price" | "title";
    order?: "asc" | "desc";
};

export const sortList: TSortList[] = [
    { id: 1, name: "популярности", sort: "rating" },
    { id: 2, name: "цена по убыванию", sort: "price", order: "desc" },
    { id: 3, name: "цена по возрастанию", sort: "price", order: "asc" },
    { id: 4, name: "алфавиту", sort: "title" },
];

const Sort: React.FC = React.memo(() => {
    const { sortItems } = useSelector(filterSelector);
    const [isVisible, setIsVisible] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const onClickSortItem = useCallback((item: TSortList) => {
        dispatch(setSortItem(item));
        setIsVisible(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleclickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setIsVisible(false);
            }
        };

        document.body.addEventListener("click", handleclickOutside);

        // данная функция вызывается по принципу willUnmount
        return () => {
            document.body.removeEventListener("click", handleclickOutside);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisible(!isVisible)}>{sortItems.name}</span>
            </div>
            {isVisible && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => onClickSortItem(item)}
                                className={sortItems.id === item.id ? "active" : ""}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default Sort;
