import styled from "styled-components";

export const LabelWrapper = styled.label`
    position: relative;

    & input {
        padding: 26px 10px 6px 10px;
        font-size: 20px;
        outline: ${(props) => (props.iserror ? "2px solid red" : "none")};
        border: 1px solid ${(props) => (props.iserror ? "transparent" : "#999")};
        border-radius: 4px;
        width: 100%;

        + span {
            font-size: 20px;
            position: absolute;
            top: 20px;
            left: 10px;
            color: ${(props) => (props.iserror ? "red" : "#999")} !important;
            transition-duration: 100ms;
            cursor: text;
        }

        &:focus {
            border: 1px solid transparent;
            outline: 2px solid ${(props) => props.theme.colors.main};

            + span {
                font-size: 12px;
                top: 4px;
                color: ${(props) => props.theme.colors.main};
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
    font-size: 12px;
`;
