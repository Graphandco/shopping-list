/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";

const FoodsContext = createContext();

export const FoodsContextProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const q = query(
            // orderBy("createdAt", "desc")
            collection(db, "shopping"),
            orderBy("name", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let foodsArr = [];
            querySnapshot.forEach((doc) => {
                foodsArr.push({ ...doc.data(), id: doc.id });
            });
            setFoods(foodsArr);
            console.log(foodsArr);
        });
        return () => unsubscribe();
    }, []);

    return (
        <FoodsContext.Provider value={{ foods, setFoods }}>
            {children}
        </FoodsContext.Provider>
    );
};

export const FoodItems = () => {
    return useContext(FoodsContext);
};
