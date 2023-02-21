import { Link } from "react-router-dom";
import { IMeal } from "../shared/models/food.model";

interface IProp{
    meal: IMeal,
    addToCart: (meal: IMeal) => void;
}

const MealCard = ({meal, addToCart}: IProp) => {

    const {strMeal, strMealThumb, price} = meal;

  return (
    <div className="flex flex-col space-y-2" key={Math.random()}>
      <Link to="/">
        <figure>
          <img src={strMealThumb} alt="" className="rounded-xl" />
        </figure>
      </Link>
      <p
        className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis"
        title={strMeal}
      >
        {strMeal}
      </p>
      <div className="flex justify-between items-center space-x-5">
        <p className="text-sm font-bold text-red-500">RS.{price}</p>
        <button onClick={() => addToCart(meal)}>
          <figure className="w-5">
            <img src="/images/cart.png" alt="" />
          </figure>
        </button>
      </div>
    </div>
  );
}

export default MealCard