import { TiShoppingCart } from "react-icons/ti";
// import { VscChecklist } from "react-icons/vsc";
import { VscTasklist } from "react-icons/vsc";
import { RiPlayListAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="py-3 p-2 flex items-center justify-between bg-slate-500">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <TiShoppingCart className="text-xl text-white" />
                    <h1 className="text-lg text-center font-bold text-white">
                        Shopping List
                    </h1>
                </div>
            </Link>

            <div className="flex items-center gap-3">
                <Link to="/">
                    <VscTasklist />
                </Link>
                <Link to="/list">
                    <RiPlayListAddFill />
                </Link>
            </div>
        </header>
    );
};

export default Header;
