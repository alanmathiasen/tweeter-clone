import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, setDoc, where, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    //todo on first login choose username
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                nombre: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL,
                seguidores: [],
                authProvider: "google",
                siguiendo: [],
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
        const userExists = await getDoc(doc(db, "users", username));

        if (userExists.exists()) throw new Error("El nombre de usuario ya existe.");
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", username), {
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
