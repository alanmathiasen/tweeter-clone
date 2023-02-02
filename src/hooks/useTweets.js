import { useEffect, useState } from "react";
import { getTweetsOnRealTime } from "../firebase/getters";
export const useTweets = () => {
    const [loading, setLoading] = useState(true);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                await getTweetsOnRealTime(setTweets);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { loading, tweets };
};
