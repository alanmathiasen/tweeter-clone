import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { onlyInLeft } from "../helpers/arrayHelpers";

const isSameTweet = (a, b) => a.id === b.id;

export const useTweets = (props = null) => {
    const [loading, setLoading] = useState(false);
    const [tweets, setTweets] = useState(null);
    const [queuedTweets, setQueuedTweets] = useState([]);
    const [snapshot, setSnapshot] = useState(null);

    useEffect(() => {
        let docQuery = query(collection(db, "tweets"), orderBy("timestamp", "desc"));
        if (props && props.tagQuery)
            docQuery = query(
                collection(db, "tweets"),
                where(props.tagQuery.field, "array-contains", props.tagQuery.value),
                orderBy("timestamp", "desc")
            );
        const unsubscribe = onSnapshot(docQuery, (querySnapshot) => {
            setSnapshot(querySnapshot);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (snapshot) {
            const snapshotTweets = [];
            if (tweets === null) {
                snapshot.forEach((doc) => {
                    snapshotTweets.push({ ...doc.data(), id: doc.id });
                });
                console.log(snapshotTweets);
                setTweets(snapshotTweets);
            } else {
                snapshot.forEach((doc) => {
                    snapshotTweets.push({ ...doc.data(), id: doc.id });
                });

                if (snapshotTweets.length < tweets.length) setTweets(snapshotTweets);
                else {
                    const newTweets = onlyInLeft(snapshotTweets, tweets, isSameTweet);
                    setQueuedTweets(newTweets);
                }
            }
        }
    }, [snapshot]);

    useEffect(() => {}, [tweets]);

    const mergeTweets = (e) => {
        e.stopPropagation();
        setTweets([...queuedTweets, ...tweets]);
        setQueuedTweets([]);
    };

    return { loading, tweets, queuedTweets, mergeTweets };
};
