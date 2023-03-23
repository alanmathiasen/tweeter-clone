import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { collection, getDocs, query, setDoc, where, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { getUsersByQuery } from "./userCrud";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    //todo on first login choose username
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        //delete spaces, limit characters to 10, add 4 random numbers
        const newRoute =
            user.displayName.replace(/\s+/g, "").slice(0, 10) + Math.floor(1000 + Math.random() * 9000).toString();
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.email), {
                username: user.displayName,
                route: newRoute,
                email: user.email,
                photoURL: user.photoURL,
                authProvider: "google",
                followers: [],
                following: [],
            });
        }
        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (username, email, password) => {
    try {
        //todo this should be get by query
        const userExists = await getUsersByQuery("route", username);

        if (userExists.length > 0) throw new Error("El nombre de usuario ya existe.");
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.email), {
            route: username,
            email,
            username: username,
            authProvider: "local",
            followers: [],
            following: [],
        });
    } catch (err) {
        throw err;
    }
};

export const logout = () => {
    signOut(auth);
};
