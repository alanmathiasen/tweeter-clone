import styled from "styled-components";

export const LabelWrapper = styled.label`
    position: relative;

    :placeholder-shown {
        & span {
            font-size: 12px;
            top: 4px;
        }
    }

    & span {
        font-size: 20px;
        position: absolute;
        top: 20px;
        left: 10px;
        color: #999;
        transition-duration: 100ms;
    }

    :focus-within {
        & span {
            font-size: 12px;
            top: 4px;
            color: #ee6262;
        }
    }
    & input {
        padding: 26px 10px 6px 10px;
        font-size: 20px;
        outline: none;
        border: 1px solid #999;
        border-radius: 4px;
        width: 100%;
        &:focus {
            border: 1px solid transparent;
            outline: 2px solid #ee6262;
        }
        :not(:placeholder-shown) {
            + span {
                font-size: 12px;
                top: 4px;
            }
        }
    }
`;

export const SpanLabel = styled.span`
    position: absolute;
`;

export const AnimInput = styled.input``;
