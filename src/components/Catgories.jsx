import React from "react";

const Categories = (props) => {
  const { activeCategory, setActiveCategory } = props;
  const categories = [
    { id: 1, name: 'Все' },
    { id: 2, name: 'Мясные' },
    { id: 3, name: 'Вегетарианская' },
    { id: 4, name: 'Гриль' },
    { id: 5, name: 'Острые' },
    { id: 6, name: 'Закрытые' },
  ]

  // const chooseCategory = (id) => {
  //   setActiveCategory(id);
  // }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((pizza) => (
            <li key={pizza.id} onClick={() => setActiveCategory(pizza.id)} className={activeCategory === pizza.id ? 'active' : ''}>{pizza.name}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;