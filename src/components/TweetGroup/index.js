import { useState, useEffect } from "react";

import { Wrapper } from "./TweetGroup.styles";

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import TweetIndividual from "../TweetIndividual";

const TweetGroup = ({ tweetArray, parent }) => {
    return (
        <Wrapper>
            {tweetArray &&
                tweetArray.map((child, index) => (
                    <TweetIndividual
                        tweetId={child.id}
                        key={child.id}
                        lines={{
                            hasUp: parent && index !== 0 ? true : false,
                            hasDown: parent && true,
                        }}
                    />
                ))}
            {console.log(parent, "PARNETGROUP")}
        </Wrapper>
    );
};

export default TweetGroup;
