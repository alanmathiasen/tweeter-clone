import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

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
