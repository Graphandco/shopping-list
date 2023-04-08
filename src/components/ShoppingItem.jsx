// import { MdShoppingCartCheckout } from "react-icons/md";
// import { BiCartAdd } from "react-icons/bi";
import { db } from "../../firebase";
import { ReactSVG } from "react-svg";
import { updateDoc, doc } from "firebase/firestore";
const ShoppingItem = ({ food, actionFood }) => {
    const { category, name, image, incart, tobuy } = food;
    // let bgColor = "red";
    // switch (category) {
    //     case "Fruits & Légumes": {
    //         bgColor = "before:bg-green-700";
    //         break;
    //     }
    //     case "Épicerie sucrée":
    //         bgColor = "before:bg-yellow-950";
    //         break;
    //     default:
    //         break;
    // }

    const updateFood = async (id) => {
        actionFood === "incart"
            ? await updateDoc(doc(db, "shopping", id), {
                  incart: !food.incart,
              })
            : await updateDoc(doc(db, "shopping", id), {
                  tobuy: true,
                  incart: true,
              });
    };

    return (
        <>
            <div
                //aspect-[1.2/1]
                //before:content-[''] before:absolute before:inset-0 before:z-0 before:rounded-[15px] ${bgColor} before:opacity-10
                className={`bg-base-300 rounded-[15px] shadow-xl py-4 px-1 flex flex-col justify-center gap-2 text-center relative  ${
                    tobuy === true || (incart === true && "opacity-30")
                }`}
                onClick={() => updateFood(food.id)}
            >
                {/* <img className="h-[2rem]" src={Kiwi} alt="Fruit" /> */}
                <div className="flex flex-col content-center gap-1 relative z-1">
                    <ReactSVG
                        className="h-[2rem] w-auto mx-auto"
                        src={`/food/${image}.svg`}
                    />
                    <div className="text-xs font-semibold capitalize ">
                        {name}
                    </div>
                </div>
                {/* {list === "all" ? (
                    <BiCartAdd className="ml-auto text-xl opacity-40" />
                ) : (
                    <MdShoppingCartCheckout className="ml-auto text-xl opacity-40" />
                )} */}
            </div>
        </>
    );
};

export default ShoppingItem;
