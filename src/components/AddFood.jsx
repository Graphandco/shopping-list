import React, { useState } from "react";
import { FoodItems } from "../context/FoodsContext";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
    const { foods } = FoodItems();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const addFood = async (e) => {
        e.preventDefault(e);
        await addDoc(collection(db, "shopping"), {
            name,
            category,
            image,
            incart: false,
            tobuy: false,
        });
        setName("");
        setCategory("");
        setImage("");
        // setTimeout(() => {
        //     navigate("/list");
        // }, "1000");
    };

    let allCatList = foods.map((item) => item.category);
    const catList = [...new Set(allCatList)];
    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-4" className="btn">
                Ajouter un produit
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label
                        htmlFor="my-modal-4"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-semibold mb-5">
                        Ajouter un article
                    </h3>
                    <div className="py-4">
                        <input
                            type="text"
                            placeholder="Nom du produit"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <select
                            className="select select-bordered w-full max-w-xs mt-5"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Divers</option>
                            {catList &&
                                catList.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Image du produit"
                            className="input input-bordered w-full max-w-xs mt-5"
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <div className="p-2 text-center mt-5">
                            <button
                                onClick={addFood}
                                className="btn btn-primary"
                            >
                                Ajouter l'article
                            </button>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default AddFood;
