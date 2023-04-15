// import { MdShoppingCartCheckout } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { db } from "../../firebase";
import { ReactSVG } from "react-svg";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
const ShoppingItem = ({ food, actionFood, edit }) => {
    const { id, name, image, incart, tobuy, tobuyforusers, incartforusers } =
        food;
    const { user } = UserAuth();

    const handleUserInCart = async () => {
        if (incartforusers?.includes(user?.uid)) {
            await updateDoc(doc(db, "shopping", id), {
                incartforusers: incartforusers.filter(
                    (item) => item !== user.uid
                ),
            });
        } else {
            await updateDoc(doc(db, "shopping", id), {
                incartforusers: [...incartforusers, user?.uid],
            });
        }
    };

    const handleUserToBuy = async () => {
        if (tobuyforusers?.includes(user.uid)) {
            await updateDoc(doc(db, "shopping", id), {
                tobuyforusers: tobuyforusers.filter(
                    (item) => item !== user.uid
                ),
                incartforusers: incartforusers.filter(
                    (item) => item !== user.uid
                ),
            });
        } else {
            console.log("ajouté");
            await updateDoc(doc(db, "shopping", id), {
                tobuyforusers: [...tobuyforusers, user.uid],
                incartforusers: [...incartforusers, user.uid],
            });
        }
    };

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

    const updateFood = async () => {
        actionFood === "incart" ? handleUserInCart() : handleUserToBuy();
    };

    const deleteFood = async (id) => {
        if (
            window.confirm(
                `Voulez-vous vraiment supprimer le produit ${name} ?`
            )
        ) {
            await deleteDoc(doc(db, "shopping", id));
        }
    };

    return (
        <>
            <div
                //aspect-[1.2/1]
                //before:content-[''] before:absolute before:inset-0 before:z-0 before:rounded-[15px] ${bgColor} before:opacity-10
                className={`bg-base-300 rounded-[15px] shadow-xl py-4 px-1 flex flex-col justify-center gap-2 text-center relative cursor-pointer  ${
                    tobuy === true || (incart === true && "opacity-30")
                }`}
                onClick={() => updateFood(food.id)}
            >
                {/* <div onClick={handleUserInCart} className="btn btn-secondary">
                    Click
                </div> */}
                {edit && (
                    <div className="edit-food absolute inset-0 flex justify-around items-center p-2 bg-slate-800/75 z-10 text-white text-xl">
                        <div className="edit">
                            <FaEdit />
                        </div>
                        <div className="delete">
                            <FaTrash onClick={() => deleteFood(id)} />
                        </div>
                    </div>
                )}
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
