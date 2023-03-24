import reactStringReplace from "react-string-replace";
import DisplayUserWithPopover from "../components/common/Tags/DisplayUserWithPopover";
import Hashtag from "../components/common/Tags/Hashtag";
import { v4 as uuid } from "uuid";

export const parseMentions = (description) => {
    let mentionRegex = /@+__(.*?)\^+__.*?@+\^+/;
    let tagRegex = /\$+__(.*?)~+__.*?\$+~+/;
    const descWithMentions = reactStringReplace(description, mentionRegex, (match) => (
        <DisplayUserWithPopover route={match} key={uuid()}>
            {`@${match}`}
        </DisplayUserWithPopover>
    ));
    const descWithMentionsAndTags = reactStringReplace(descWithMentions, tagRegex, (match) => (
        <Hashtag tag={match} key={uuid()} />
    ));

    return descWithMentionsAndTags;
};
