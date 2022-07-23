import React from "react";
import { useDispatch } from 'react-redux';
import { setActiveCategory } from "../redux/slices/filterSlice";

const categories = [
  { id: 1, name: 'Все' },
  { id: 2, name: 'Мясные' },
  { id: 3, name: 'Вегетарианская' },
  { id: 4, name: 'Гриль' },
  { id: 5, name: 'Острые' },
  { id: 6, name: 'Закрытые' },
];

const Categories = (props) => {
  const { activeCategory } = props;
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {
          categories.map((pizza) => (
            <li key={pizza.id} onClick={() => dispatch(setActiveCategory(pizza.id))} className={activeCategory === pizza.id ? 'active' : ''}>{pizza.name}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;