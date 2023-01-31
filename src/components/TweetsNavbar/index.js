import React from "react";
import { Wrapper, ListContainer, List, Line } from "./TweetsNavbar.styles";

const TweetsNavbar = () => {
  return (
    <Wrapper>
      <ListContainer>
        <List color={"#000"}>
          <p>Tweets</p>
          <Line></Line>
        </List>
        <List>
          <p>Tweets y replies</p>
        </List>
        <List>
          <p>Media</p>
        </List>
        <List>
          <p>Likes</p>
        </List>
      </ListContainer>
    </Wrapper>
  );
};

export default TweetsNavbar;
