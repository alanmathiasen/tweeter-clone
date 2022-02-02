import {
  VscHeart,
  VscComment,
  VscGitCompare,
  VscFoldUp,
} from "react-icons/vsc";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { Wrapper } from "./ButtonGroup.styles";

const ButtonGroup = ({ replies, likes, likeTweet, liked, showForm }) => {
  return (
    <Wrapper>
      <div>
        <a className="comment" href="#" onClick={showForm}>
          <VscComment className="commentBtn" />
          <span>{replies ? replies : ""}</span>
        </a>
      </div>
      <div>
        <a className="retweet">
          <VscGitCompare className="retweetBtn" />
          <span>2</span>
        </a>
      </div>
      <div>
        {liked ? (
          <a className="like liked" onClick={likeTweet}>
            <IoHeartSharp className="likeBtn" />
            <span>{likes ? likes : ""}</span>
          </a>
        ) : (
          <a className="like " onClick={likeTweet}>
            <IoHeartOutline className="likeBtn" />
            <span>{likes ? likes : ""}</span>
          </a>
        )}
      </div>
      <div>
        <a className="comment">
          <VscFoldUp className="commentBtn" />
          <span>30</span>
        </a>
      </div>
    </Wrapper>
  );
};

export default ButtonGroup;
