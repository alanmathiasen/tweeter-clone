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
        isLiked: false,
        likes: 0,
        isRetweeted: false,
        retweets: 0,
        isQuoted: false,
        quotes: 0,
        loading: true,
        date: "",
        isMain,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const tweetRef = doc(db, "tweets", tweetId);
        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) {
                if (!!snap.data().likes) {
                    dispatch({ type: "likes", payload: snap.data().likes.length });
                    if (snap.data().likes.includes(emailLogueado)) {
                        dispatch({ type: "isLiked", payload: true });
                    } else {
                        dispatch({ type: "isLiked", payload: false });
                    }
                }
                if (snap.data().quotes) {
                    dispatch({ type: "quotes", payload: snap.data().quotes.length });
                    if (snap.data().quotes.includes(emailLogueado)) {
                        dispatch({ type: "isQuoted", payload: true });
                    } else {
                        dispatch({ type: "isQuoted", payload: false });
                    }
                }
                if (snap.data().retweets) {
                    dispatch({ type: "retweets", payload: snap.data().retweets.length });
                    if (snap.data().retweets.includes(emailLogueado)) {
                        dispatch({ type: "isRetweeted", payload: true });
                    } else {
                        dispatch({ type: "isRetweeted", payload: false });
                    }
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
        case "isLiked":
            return { ...state, isLiked: action.payload };
        case "likes":
            return { ...state, likes: action.payload };
        case "isRetweeted":
            return { ...state, isRetweeted: action.payload };
        case "retweets":
            return { ...state, retweets: action.payload };
        case "isQuoted":
            return { ...state, isQuoted: action.payload };
        case "quotes":
            return { ...state, quotes: action.payload };
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
