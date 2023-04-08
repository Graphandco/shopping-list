import { TiShoppingCart } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="py-2 px-6 flex items-center justify-between bg-slate-500 text-white">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <TiShoppingCart className="text-xl " />
                    <h1 className="text-lg text-center font-bold">
                        Shopping List
                    </h1>
                </div>
            </Link>

            <div className="flex items-center gap-5 text-xl">
                <Link to="/">
                    <FaShoppingCart />
                </Link>
                <Link to="/list">
                    <GiShop />
                </Link>
            </div>
        </header>
    );
};

export default Header;
