import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
const UserMenu = () => {
    // const { user, logout, isUserAdmin, googleSignIn, zzzz } = UserAuth();
    const { user, logout, isUserAdmin, googleSignIn } = UserAuth();
    // const isAdmin = isUserAdmin();
    const navigate = useNavigate();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            console.log("You are logged out");
        } catch (e) {
            console.log(e.message);
        }
    };

    // console.log(zzzz);

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-6 rounded-full">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="" />
                    ) : (
                        <div className="w-full h-full grid place-items-center">
                            <FaUserAlt />
                        </div>
                    )}
                </div>
            </label>
            <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
                {user && (
                    <>
                        <li>
                            <span className="text-primary pointer-events-none">
                                {user?.displayName}
                            </span>
                        </li>
                        <li>
                            <span className="opacity-50" onClick={handleLogout}>
                                Se déconnecter
                            </span>
                        </li>
                    </>
                )}
                {!user && (
                    <li>
                        <span onClick={handleGoogleSignIn}>Se connecter</span>
                    </li>
                    // <li>
                    //     <Link to="/login">Se connecter</Link>
                    // </li>
                )}
                {/* <li>
                    <span className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </span>
                </li> */}
            </ul>
        </div>
    );
};

export default UserMenu;
