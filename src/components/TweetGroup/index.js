import { useState, useEffect } from "react";

import { Wrapper } from "./TweetGroup.styles";

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import TweetIndividual from "../TweetIndividual";

const TweetGroup = ({ tweetArray }) => {
  return (
    <Wrapper>
      {tweetArray &&
        tweetArray.map((child) => (
          <TweetIndividual tweetId={child.id} key={child.id} />
        ))}
    </Wrapper>
  );
};

export default TweetGroup;
