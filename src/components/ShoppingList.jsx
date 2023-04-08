import React from "react";
import ShoppingItem from "./ShoppingItem";
import { FoodItems } from "../context/FoodsContext";
import ShoppingListByCat from "./ShoppingListByCat";

const ShoppingList = ({ food, page }) => {
    const { foods } = FoodItems();
    let allCatList = foods.map((item) => item.category);
    const catList = [...new Set(allCatList)];
    return (
        <>
            {catList &&
                catList.map((cat, index) => (
                    <ShoppingListByCat
                        key={index}
                        cat={cat}
                        food={food}
                        page={page}
                    />
                ))}

            <div className="md:container md:mx-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 px-2"></div>
            </div>
        </>
    );
};

export default ShoppingList;
