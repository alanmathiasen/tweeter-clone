import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchInput from "../../components/common/SearchInput";
import { getAlltags } from "../../firebase/tweetCrud";
import { Wrapper, TagWrapper, Trending, HashtagText, TagList } from "./Explore.styles";

const ListItemTag = ({ hashtag }) => {
    console.log({ hashtag });
    return (
        <TagWrapper>
            <Trending>Tendencia en Argentina</Trending>
            <HashtagText>#{hashtag}</HashtagText>
            <Trending>x twits.</Trending>
        </TagWrapper>
    );
};

const Explore = () => {
    const [tags, setTags] = useState();

    useEffect(() => {
        (async () => {
            const tagsDB = await getAlltags("");
            setTags(tagsDB);
        })();
    }, []);
    if (!tags) return "loading";
    return (
        <Wrapper>
            <SearchInput />
            <TagList>
                {tags.map((el) => {
                    console.log({ el });
                    return <ListItemTag key={el.id} hashtag={el.id} />;
                })}
            </TagList>
        </Wrapper>
    );
};

export default Explore;
