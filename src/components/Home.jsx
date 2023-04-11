import { FoodItems } from "../context/FoodsContext";
import ShoppingItem from "./ShoppingItem";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Home = () => {
    const { foods } = FoodItems();

    let foodToBuy = foods.filter(function (food) {
        return food.tobuy ? food : "";
    });
    let foodInCart = foodToBuy.filter(function (food) {
        return food.incart ? food : "";
    });
    let foodNotInCart = foodToBuy.filter(function (food) {
        return food.incart ? "" : food;
    });
    let allCatList = foodInCart.map((item) => item.category);
    const catList = [...new Set(allCatList)];

    const removeFoodToBuy = async () => {
        foodToBuy.forEach((food) => {
            updateDoc(doc(db, "shopping", food.id), {
                tobuy: false,
                incart: false,
            });
        });
    };

    return (
        <>
            {catList.length && (
                <div className="foods-not-in-cart mt-20">
                    {catList.map((cat) => (
                        <div key={cat} className="cat-item">
                            <h2 className="bg-slate-500 p-2 mb-5 text-white font-semibold">
                                {cat}
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5">
                                {foodInCart
                                    .filter(function (food) {
                                        return food.category === cat;
                                    })
                                    .map((food, index) => (
                                        <ShoppingItem
                                            key={index}
                                            food={food}
                                            list="all"
                                            actionFood="incart"
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {foodNotInCart.length > 0 && (
                <>
                    <div className="food-in-cart">
                        <h2 className="bg-slate-700 p-2 mb-5 text-white font-semibold">
                            Déjà dans le panier
                        </h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5 opacity-50">
                            {foodNotInCart.map((food, index) => (
                                <ShoppingItem
                                    key={index}
                                    food={food}
                                    list="all"
                                    actionFood="incart"
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
            {foodToBuy.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-8 w-full h-[100vh]">
                    <img
                        className="w-[300px] max-w-[100%]"
                        src="empty-cart.png"
                        alt="empty"
                    />
                    <h2 className="text-white text-lg">Le panier est vide !</h2>

                    <Link to={`/list`}>
                        <button className="btn btn-primary">
                            <span>Ajouter</span>
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="p-2 text-center">
                    <button
                        onClick={removeFoodToBuy}
                        className="btn btn-primary"
                    >
                        Vider la liste
                    </button>
                </div>
            )}
        </>
    );
};

export default Home;
