import styled from "styled-components";

export const LabelWrapper = styled.label`
    position: relative;

    & input {
        padding: 26px 10px 6px 10px;
        font-size: 20px;
        outline: ${(props) => (props.isError ? "2px solid red" : "none")};
        border: 1px solid ${(props) => (props.isError ? "transparent" : "#999")};
        border-radius: 4px;
        width: 100%;

        + span {
            font-size: 20px;
            position: absolute;
            top: 20px;
            left: 10px;
            color: ${(props) => (props.isError ? "red" : "#999")} !important;
            transition-duration: 100ms;
        }

        &:focus {
            border: 1px solid transparent;
            outline: 2px solid #ee6262;

            + span {
                font-size: 12px;
                top: 4px;
                color: #ee6262;
            }
        }

        //if placeholder is not shown (there's something written in the input) and is not focused, keep text on top

        :not(:placeholder-shown) {
            + span {
                font-size: 12px;
                top: 4px;
            }
        }
    }
`;

export const SpanError = styled.span`
    color: red;
`;
