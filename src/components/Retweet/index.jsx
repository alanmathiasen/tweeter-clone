import React from "react";
import { VscGitCompare } from "react-icons/vsc";
import { useState, useEffect } from "react";
import TweetIndividual from "../TweetIndividual";
import { Wrapper, RetweetIcon, Text } from "./Retweet.styles";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuthor, getTweet } from "../../firebase/getters";
const Retweet = ({ tweet }) => {
    const [author, setAuthor] = useState();
    const [parentTweet, setParentTweet] = useState(undefined);

    useEffect(() => {
        (async function getData() {
            // const userRef = doc(db, "usuarios", tweet.parent);
            // const userSnap = await getDoc(userRef);
            // userSnap.data() ? setRetweetFrom(userSnap.data()) : setRetweetFrom({});
            console.log("tweet on retweet", { tweet });
            if (tweet && tweet.parent) setAuthor(await getAuthor(tweet.parent));
            if (tweet && tweet.retweet) setParentTweet(await getTweet(tweet.retweet));
        })();
    }, [tweet]);

    return (
        <>
            {parentTweet && (
                <TweetIndividual tweetId={parentTweet.id} tweet={parentTweet}>
                    <RetweetIcon>
                        <VscGitCompare />
                    </RetweetIcon>
                    <Text>{author ? author.ruta : null}</Text>
                </TweetIndividual>
            )}
        </>
    );
};

export default Retweet;
