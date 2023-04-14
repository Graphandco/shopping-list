import { TiShoppingCart } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
    return (
        <header className="fixed top-0 w-full z-10 py-2 px-6 flex items-center justify-between bg-slate-500 text-white">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <TiShoppingCart className="text-xl " />
                    <h1 className="text-lg text-center font-bold">
                        Shopping List
                    </h1>
                </div>
            </Link>

            <div className="flex items-center gap-1">
                <Link
                    to="/"
                    className="btn btn-ghost btn-circle avatar text-lg"
                >
                    <FaShoppingCart />
                </Link>
                <Link
                    to="/list"
                    className="btn btn-ghost btn-circle avatar text-lg"
                >
                    <GiShop />
                </Link>
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
