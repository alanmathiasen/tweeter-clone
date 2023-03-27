import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
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
//todo arreglar
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

export const followUser = async (userToFollow, userWhoFollows) => {
    try {
        await updateDoc(doc(db, "users", userToFollow), {
            followers: arrayUnion(userWhoFollows),
        });
        await updateDoc(doc(db, "users", userWhoFollows), {
            following: arrayUnion(userToFollow),
        });
    } catch (err) {
        throw err;
    }
};

export const unfollowUser = async (userToUnfollow, userWhoUnfollows) => {
    try {
        await updateDoc(doc(db, "users", userToUnfollow), {
            followers: arrayRemove(userWhoUnfollows),
        });
        await updateDoc(doc(db, "users", userWhoUnfollows), {
            following: arrayRemove(userToUnfollow),
        });
    } catch (err) {
        throw err;
    }
};
