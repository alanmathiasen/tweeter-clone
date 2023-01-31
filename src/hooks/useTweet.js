import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { db } from "../firebase/firebaseConfig";
// import { getAuthor } from "../firebase/getters";
import { longDate, shortDate } from "../helpers/dateHelper";

export const useTweet = ({ tweetId, isMain }) => {
    const { emailLogueado } = useGlobalContext();

    const initialState = {
        tweetId,
        liked: false,
        retweeted: false,
        quoted: false,
        loading: true,
        date: "",
        isMain,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const tweetRef = doc(db, "tweets", tweetId);
        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) {
                if (snap.data().likes && snap.data().likes.includes(emailLogueado)) {
                    dispatch({ type: "like", payload: true });
                } else {
                    dispatch({ type: "like", payload: false });
                }

                if (snap.data().retweets && snap.data().retweets.includes(emailLogueado)) {
                    dispatch({ type: "retweet", payload: true });
                } else {
                    dispatch({ type: "retweet", payload: false });
                }

                if (isMain) dispatch({ type: "longDate", payload: snap.data().timestamp });
                else dispatch({ type: "shortDate", payload: snap.data().timestamp });
            } else dispatch({ action: "tweet", payload: {} });
        });

        return () => unsubscribe();
    }, []);

    return { state, dispatch };
};

// (async () => {
//     const author = await getAuthor(state.tweet);
//     console.log({ author });
//     dispatch({ type: "author", payload: author });
// })();

export const reducer = (state, action) => {
    switch (action.type) {
        case "like":
            return { ...state, liked: action.payload };
        case "retweet":
            return { ...state, retweeted: action.payload };
        case "quote":
            return { ...state, quoted: action.payload };
        case "author":
            return { ...state, author: action.payload };
        case "loading":
            return { ...state, loading: action.payload };
        case "longDate":
            return { ...state, date: longDate(action.payload) };
        case "shortDate":
            return { ...state, date: shortDate(action.payload) };

        default:
            throw new Error();
    }
};
