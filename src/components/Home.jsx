import { FoodItems } from "../context/FoodsContext";
import ShoppingItem from "./ShoppingItem";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
    const { foods } = FoodItems();
    const { user, googleSignIn } = UserAuth();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    let foodToBuy = foods.filter(function (food) {
        return food.tobuyforusers?.includes(user?.uid) ? food : "";
    });
    let foodInCart = foodToBuy.filter(function (food) {
        return food.incartforusers?.includes(user?.uid) ? food : "";
    });
    let foodNotInCart = foodToBuy.filter(function (food) {
        return food.incartforusers?.includes(user?.uid) ? "" : food;
    });

    let allCatList = foodInCart.map((item) => item.category);
    const catList = [...new Set(allCatList)];

    const removeFoodToBuy = async () => {
        if (window.confirm(`Voulez-vous vraiment vider la liste ?`)) {
            foodToBuy.forEach((food) => {
                console.log(food);
                updateDoc(doc(db, "shopping", food.id), {
                    incartforusers: food.incartforusers?.filter(
                        (item) => item !== user.uid
                    ),
                    tobuyforusers: food.tobuyforusers?.filter(
                        (item) => item !== user.uid
                    ),
                });
            });
        }
    };

    return (
        <>
            {!user && (
                <div className="flex flex-col items-center justify-center gap-8 w-full h-[100vh]">
                    <h2 className="text-white text-lg">
                        Connectez-vous pour accéder à votre liste de courses
                    </h2>
                    <button
                        className="btn btn-primary"
                        onClick={handleGoogleSignIn}
                    >
                        <span>Connexion</span>
                    </button>
                </div>
            )}
            {user && catList.length && (
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

            {user && foodNotInCart.length > 0 && (
                <>
                    <div className="food-in-cart mt-20">
                        <h2 className="bg-slate-700 p-2 mb-5 text-white font-semibold">
                            Déjà dans le panier
                        </h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mx-2 mb-5 opacity-50">
                            {foodNotInCart.map((food, index) => (
                                <ShoppingItem
                                    key={index}
                                    food={food}
                                    actionFood="incart"
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
            {user && foodToBuy.length === 0 ? (
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
                user && (
                    <div className="p-2 text-center">
                        <button
                            onClick={removeFoodToBuy}
                            className="btn btn-primary"
                        >
                            Vider la liste
                        </button>
                    </div>
                )
            )}
        </>
    );
};

export default Home;
