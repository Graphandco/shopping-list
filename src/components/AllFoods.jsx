import { useState } from "react";
import { FoodItems } from "../context/FoodsContext";
import ShoppingItem from "./ShoppingItem";
import AddFood from "./AddFood";
import EditFood from "./EditFood";

const AllFoods = () => {
    const { foods } = FoodItems();
    const [edit, setEdit] = useState(false);

    let foodToBuy = foods.filter(function (food) {
        return food.tobuy === true ? food : "";
    });
    let foodNotToBuy = foods.filter(function (food) {
        return food.tobuy === false ? food : "";
    });
    let allCatList = foodNotToBuy.map((item) => item.category);
    const catList = [...new Set(allCatList)];

    return (
        <div className="my-5">
            <h1 className="text-center text-white text-lg uppercase mb-5">
                Inventaire des produits
            </h1>
            <div className="foods-not-in-cart">
                {catList &&
                    catList.map((cat) => (
                        <div key={cat} className="cat-item">
                            <h2 className="bg-slate-500 p-2 mb-5 text-white font-semibold">
                                {cat}
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5">
                                {foodNotToBuy
                                    .filter(function (food) {
                                        return food.category === cat;
                                    })
                                    .map((food, index) => (
                                        <ShoppingItem
                                            key={index}
                                            food={food}
                                            list="all"
                                            edit={edit}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>

            {foodToBuy.length > 0 && (
                <>
                    <div className="food-in-cart">
                        <h2 className="bg-slate-700 p-2 mb-5 text-white font-semibold">
                            Déjà dans la liste
                        </h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5 opacity-50">
                            {foodToBuy.map((food, index) => (
                                <ShoppingItem
                                    key={index}
                                    food={food}
                                    list="all"
                                    edit={edit}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
            <div className="p-2 text-center flex justify-center gap-2">
                <AddFood />
                <EditFood edit={edit} setEdit={setEdit} />
            </div>
        </div>
    );
};

export default AllFoods;
