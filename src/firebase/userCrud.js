import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
