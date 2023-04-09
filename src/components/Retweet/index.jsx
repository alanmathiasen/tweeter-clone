import React from "react";
import { VscGitCompare } from "react-icons/vsc";
import { useState, useEffect } from "react";
import TweetIndividual from "../TweetIndividual";
import { Wrapper, RetweetIcon, Text } from "./Retweet.styles";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
const Retweet = ({ tweet }) => {
    const [retweetFrom, setRetweetFrom] = useState();

    useEffect(() => {
        //TODO abstract this

        console.log({ parent: tweet });

        (async function getAuthor() {
            const userRef = doc(db, "users", tweet.parent);
            const userSnap = await getDoc(userRef);
            userSnap.data() ? setRetweetFrom(userSnap.data()) : setRetweetFrom({});
        })();
    }, [tweet]);

    return (
        <>
            <TweetIndividual tweetId={tweet.retweet}>
                <RetweetIcon>
                    <VscGitCompare />
                </RetweetIcon>
                <Text>{retweetFrom ? retweetFrom.route : null}</Text>
            </TweetIndividual>
        </>
    );
};

export default Retweet;
