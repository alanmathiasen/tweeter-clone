import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (name, email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    let usuario = String(email);
    const [ruta] = usuario.split("@");
    const docRef = await setDoc(doc(db, "usuarios", email), {
        ruta: ruta,
        email: email,
        nombre: name,
        seguidores: [],
        siguiendo: [],
    });
};
