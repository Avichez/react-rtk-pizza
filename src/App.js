import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Catgories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';
import pizzas from './assets/pizzas.json';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item) => (
              <PizzaItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
