import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
export const useTweets = () => {
    const [loading, setLoading] = useState(true);
    const [tweets, setTweets] = useState(null);
    const [queuedTweets, setQueuedTweets] = useState([]);

    useEffect(() => {
        const docQuery = query(collection(db, "tweets"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(docQuery, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push({ ...doc.data(), id: doc.id });
            });
            if (tweets === null) setTweets(tweets);
            else setQueuedTweets([...queuedTweets, ...tweets]);
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);

    return { loading, tweets };
};
