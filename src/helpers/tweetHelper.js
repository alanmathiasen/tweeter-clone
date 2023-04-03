import reactStringReplace from "react-string-replace";
import DisplayUserWithPopover from "../components/common/Tags/DisplayUserWithPopover";
import Hashtag from "../components/common/Tags/Hashtag";
import { v4 as uuid } from "uuid";

let mentionRegex = /@+__(.*?)\^+__.*?@+\^+/;
let tagRegex = /\$+__(.*?)~+__.*?\$+~+/;
let tagRegexGlobal = /\$+__(.*?)~+__.*?\$+~+/g;

export const parseMentions = (description) => {
    let replacedText;
    replacedText = reactStringReplace(description, mentionRegex, (match) => (
        <DisplayUserWithPopover route={match} key={uuid()}>
            {`@${match}`}
        </DisplayUserWithPopover>
    ));
    replacedText = reactStringReplace(replacedText, tagRegex, (match) => <Hashtag tag={match} key={uuid()} />);

    return replacedText;
};

export const extractTagsFromRaw = (description) => {
    const matchedTags = description.match(tagRegexGlobal);
    return matchedTags ? matchedTags.map((tag) => tagRegex.exec(tag)[1]) : [];
};
