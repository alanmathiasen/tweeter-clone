import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterContent } from "../../../App.styles";
import { getAlltags } from "../../../firebase/tweetCrud";
import Loader from "../Loader";
import SearchInput from "../SearchInput";
import { HashtagText, TagList, TagWrapper, Trending } from "./ExploreTagList.styles";

const ListItemTag = ({ hashtag }) => {
    const navigate = useNavigate();
    const goTo = () => navigate(`${hashtag.id}`);
    return (
        <TagWrapper onClick={goTo}>
            <Trending>Tendencia en Argentina</Trending>
            <HashtagText>#{hashtag.id}</HashtagText>
            <Trending>{hashtag.count && hashtag.count} twits.</Trending>
        </TagWrapper>
    );
};

const ExploreTagList = () => {
    const [tags, setTags] = useState();

    useEffect(() => {
        (async () => {
            const tagsDB = await getAlltags("");
            setTags(tagsDB);
        })();
    }, []);
    if (!tags) return <Loader />;
    return (
        <>
            <TagList>
                {tags.map((el) => {
                    return <ListItemTag key={el.id} hashtag={el} />;
                })}
            </TagList>
        </>
    );
};

export default ExploreTagList;
