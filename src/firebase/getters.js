import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getAuthor = async (tweet) => {
    try {
        if (Object.keys(tweet).length !== 0 && tweet !== "ERROR") {
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

export const getTweet = async (idTweet) => {
    const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
        const twit = { ...tweetSnap.data() };
        return twit;
    } else {
        return "ERROR";
    }
};

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
