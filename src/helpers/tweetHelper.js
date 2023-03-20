import reactStringReplace from "react-string-replace";
import DisplayUserWithPopup from "../components/common/Tags/DisplayUserWithPopup";
import Hashtag from "../components/common/Tags/Hashtag";

export const parseMentions = (description) => {
    let mentionRegex = /@+__(.*?)\^+__.*?@+\^+/;
    let tagRegex = /\$+__(.*?)~+__.*?\$+~+/;
    const descWithMentions = reactStringReplace(description, mentionRegex, (match) => (
        <DisplayUserWithPopup mention={"@" + match} />
    ));
    const descWithMentionsAndTags = reactStringReplace(descWithMentions, tagRegex, (match) => <Hashtag tag={match} />);

    return descWithMentionsAndTags;
};
