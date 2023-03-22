import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        let usuario = String(email);
        const [route] = usuario.split("@");
        console.log("aca entra");
        const docRef = await setDoc(doc(db, "users", name), {
            ruta: name,
            email: email,
            nombre: name,
            seguidores: [],
            siguiendo: [],
        });
    } catch (err) {
        throw err;
    }
};

export const getUsersByQuery = async (field, text) => {
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where(field, ">=", text), where(field, "<=", text + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
        return result;
    } catch (err) {
        throw err;
    }
};

export const getUserByTweet = async (tweet) => {
    try {
        if (Object.keys(tweet).length !== 0 && tweet !== "ERROR" && tweet.usuario) {
            const userRef = doc(db, "usuarios", tweet.usuario);
            const userSnap = await getDoc(userRef);
            return userSnap.data() ? userSnap.data() : {};
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
    }
};
