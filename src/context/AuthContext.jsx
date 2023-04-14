/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignInPopup = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };

    // eslint-disable-next-line no-undef
    const zzzz = import.meta.env.VITE_FIREBASE_ADMIN_ID === user?.uid;

    const isUserAdmin = () => {
        if (
            // eslint-disable-next-line no-undef
            import.meta.env.VITE_FIREBASE_ADMIN_ID === user?.uid
        ) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                createUser,
                user,
                logout,
                signIn,
                googleSignInPopup,
                googleSignIn,
                zzzz,
                isUserAdmin,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
