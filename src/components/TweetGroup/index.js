import { Wrapper } from "./TweetGroup.styles";

import TweetIndividual from "../TweetIndividual";
import Retweet from "../Retweet";

const TweetGroup = ({ tweetArray, parent }) => {
    return (
        <Wrapper>
            {tweetArray &&
                tweetArray.map((child, index) => {
                    if (child.retweet) {
                        return <Retweet tweet={child} key={child.id} />;
                        // } else if (child.quote) {
                        //     return <Quote />;
                    } else {
                        return (
                            <TweetIndividual
                                tweetId={child.id}
                                key={child.id}
                                lines={{
                                    hasUp: parent && index !== 0 ? true : false,
                                    hasDown: parent && true,
                                }}
                                quote={child.quote}
                            />
                        );
                    }
                })}
        </Wrapper>
    );
};

export default TweetGroup;
