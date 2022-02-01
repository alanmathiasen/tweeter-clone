import React from "react";
import { Wrapper, ListContainer, List } from "./TweetsNavbar.styles";

const TweetsNavbar = () => {
  return (
    <Wrapper>
      <ListContainer>
        <List>Tweets</List>
        <List>Tweets y replies</List>
        <List>Media</List>
        <List>Likes</List>
      </ListContainer>
    </Wrapper>
  );
};

export default TweetsNavbar;
