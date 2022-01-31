import {
  VscHeart,
  VscComment,
  VscGitCompare,
  VscFoldUp,
} from "react-icons/vsc";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { Wrapper } from "./ButtonGroup.styles";

const ButtonGroup = ({ replies, likes, likeTweet, liked }) => {
  return (
    <Wrapper>
      <div>
        <div className="comment">
          <VscComment className="commentBtn" />
          <span>{replies ? replies : ""}</span>
        </div>
      </div>
      <div>
        <div className="retweet">
          <VscGitCompare className="retweetBtn" />
          <span>2</span>
        </div>
      </div>
      <div>
        {liked ? (
          <div className="like liked" onClick={likeTweet}>
            <IoHeartSharp className="likeBtn" />
            <span>{likes ? likes : ""}</span>
          </div>
        ) : (
          <div className="like " onClick={likeTweet}>
            <IoHeartOutline className="likeBtn" />
            <span>{likes ? likes : ""}</span>
          </div>
        )}
      </div>
      <div>
        <div className="comment">
          <VscFoldUp className="commentBtn" />
          <span>30</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ButtonGroup;
