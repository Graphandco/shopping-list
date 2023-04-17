import { FoodItems } from "../context/FoodsContext";
import ShoppingItem from "./ShoppingItem";
const ShoppingListByCat = ({ cat, page }) => {
    const { foods } = FoodItems();

    let foodsInCat = foods.filter(function (food) {
        return food.category === cat;
    });

    let foodsInCatSorted = foodsInCat.sort((a, b) => {
        return a - b;
    });
    console.log(foodsInCat);
    console.log(foodsInCatSorted);

    return (
        <div className="my-10">
            <h2 className="bg-base-800 bg-slate-500 p-2 mb-5 text-white font-semibold">
                {cat}
            </h2>
            test
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2">
                {foodsInCatSorted.map((food, index) => (
                    <ShoppingItem key={index} food={food} list="all" />
                ))}
            </div>
        </div>
    );
};
export default ShoppingListByCat;
