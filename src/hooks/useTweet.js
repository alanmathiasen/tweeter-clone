import { format } from "fecha";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { db } from "../firebase/firebaseConfig";
import { getAuthor } from "../firebase/getters";
// import { getAuthor } from "../firebase/getters";
import { longDate, shortDate } from "../helpers/dateHelper";

export const useTweet = ({ tweetId, isMain }) => {
    const { emailLogueado } = useGlobalContext();

    const [tweet, setTweet] = useState({});
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [isRetweetedByUser, setIsRetweetedByUser] = useState(false);
    const [author, setAuthor] = useState({});
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const tweetRef = doc(db, "tweets", tweetId);
        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) {
                setTweet({ id: tweetId, ...snap.data() });
                if (snap.data().likes && snap.data().likes.includes(emailLogueado)) {
                    setIsLikedByUser(true);
                } else {
                    setIsLikedByUser(false);
                }
                if (snap.data().retweets && snap.data().retweets.includes(emailLogueado)) {
                    console.log(snap.data().retweets);
                    setIsRetweetedByUser(true);
                } else {
                    setIsRetweetedByUser(false);
                }
            } else setTweet({});
        });
        return () => unsubscribe();
    }, [tweetId, emailLogueado]);

    useEffect(() => {
        try {
            (async () => {
                setAuthor(await getAuthor(tweet));
            })();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        if (tweet.timestamp) setDate(isMain ? longDate(tweet.timestamp) : shortDate(tweet.timestamp));
    }, [tweet, isMain]);

    return {
        tweet,
        isLikedByUser,
        isRetweetedByUser,
        author,
        showReplyModal,
        setShowReplyModal,
        showQuoteModal,
        setShowQuoteModal,
        date,
        loading,
    };
};
