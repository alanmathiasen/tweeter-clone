import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        let usuario = String(email);
        const [ruta] = usuario.split("@");
        console.log(name);
        const docRef = await setDoc(doc(db, "usuarios", email), {
            ruta: ruta,
            email: email,
            nombre: name,
            seguidores: [],
            siguiendo: [],
        });
    } catch (err) {
        throw err;
    }
};

export const getUsersByQuery = async (text) => {
    try {
        const userRef = collection(db, "usuarios");
        const q = query(userRef, where("ruta", ">=", text), where("ruta", "<=", text + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
        return result;
    } catch (err) {
        throw err;
    }
};
