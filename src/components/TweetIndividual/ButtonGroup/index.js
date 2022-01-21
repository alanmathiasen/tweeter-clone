import {
  VscHeart,
  VscComment,
  VscGitCompare,
  VscFoldUp,
} from "react-icons/vsc";

import { Wrapper } from "./ButtonGroup.styles";

const ButtonGroup = ({ comments }) => {
  return (
    <Wrapper>
      <div>
        <div className="comment">
          <VscComment className="commentBtn" />
          <span>5</span>
        </div>
      </div>
      <div>
        <div className="retweet">
          <VscGitCompare className="retweetBtn" />
          <span>2</span>
        </div>
      </div>
      <div>
        <div className="like">
          <VscHeart className="likeBtn" />
          <span>50</span>
        </div>
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
