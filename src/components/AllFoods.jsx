import { useState } from "react";
import { FoodItems } from "../context/FoodsContext";
import ShoppingItem from "./ShoppingItem";
import AddFood from "./AddFood";
import EditFood from "./EditFood";
import { UserAuth } from "../context/AuthContext";

const AllFoods = () => {
    const { foods } = FoodItems();
    const { user } = UserAuth();
    const [edit, setEdit] = useState(false);
    const [searchText, setSearchText] = useState("");

    let foodToBuy = foods.filter(function (food) {
        return food.tobuyforusers?.includes(user?.uid) ? food : "";
    });
    let foodNotToBuy = foods.filter(function (food) {
        return food.tobuyforusers?.includes(user?.uid) ? "" : food;
    });

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const filteredfoods = foodNotToBuy.filter((food) => {
        normalizeText(searchText);
        const normalizedFoodName = normalizeText(food.name);
        return normalizedFoodName.includes(searchText.toLowerCase())
            ? food
            : "";
    });

    let allCatList = filteredfoods.map((item) => item.category);
    const catList = [...new Set(allCatList)];

    return (
        <div className="mt-20 mb-5">
            <div className="flex justify-between items-center p-2 mb-5">
                <h1 className="text-center text-white text-lg uppercase font-semibold">
                    Inventaire des produits
                </h1>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className="foods-not-in-cart">
                {catList &&
                    catList.map((cat) => (
                        <div key={cat} className="cat-item">
                            <h2 className="bg-slate-500 p-2 mb-5 text-white font-semibold">
                                {cat}
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5">
                                {filteredfoods
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
