import { useEffect, useState } from "react";
import { getTweetsOnRealTime } from "../firebase/getters";
export const useLoadTweets = () => {
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
