import React from "react";

const Categories = (props) => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const chooseCategory = (id) => {
    setActiveCategory(id);
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((pizza, index) => (
            <li key={index} onClick={() => chooseCategory(index)} className={activeCategory === index ? 'active' : ''}>{pizza}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;