import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
export const getAuthor = async (tweet) => {
    if (Object.keys(tweet).length !== 0) {
        const userRef = doc(db, "usuarios", tweet.usuario);
        const userSnap = await getDoc(userRef);
        console.log(userSnap.data());
        return userSnap.data() ? userSnap.data() : {};
    } else {
        return null;
    }
};
