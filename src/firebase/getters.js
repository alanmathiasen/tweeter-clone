import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getAuthor = async (tweet) => {
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
//TODO i dont like this
export const getTweetsOnRealTime = async (setTweets) => {
    try {
        const docQuery = query(collection(db, "tweets"), orderBy("timestamp", "desc"));

        onSnapshot(docQuery, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push({ ...doc.data(), id: doc.id });
            });
            setTweets(tweets);
        });
    } catch (err) {
        throw err;
    }
};
