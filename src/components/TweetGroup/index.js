import TweetIndividual from "../TweetIndividual";
import Retweet from "../Retweet";

import { Wrapper } from "./TweetGroup.styles";

const TweetGroup = ({ tweetArray, parent }) => {
    return (
        <Wrapper>
            {tweetArray &&
                tweetArray.map((tweet, index) => {
                    if (tweet.retweet) return <Retweet tweet={tweet} key={tweet.id} />;
                    else {
                        // } else if (tweet.quote) {
                        //     return <Quote />;
                        return (
                            <TweetIndividual
                                //tweetId={tweet.id}
                                tweet={tweet}
                                key={tweet.id}
                                lines={{
                                    hasUp: parent && index !== 0 ? true : false,
                                    hasDown: parent && true,
                                }}
                                quote={tweet.quote}
                            />
                        );
                    }
                })}
        </Wrapper>
    );
};

export default TweetGroup;
