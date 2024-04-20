import { ButtonWrapper } from './Button-style.js';

export default function Button({style, text, onClick}) {
    return (
        <ButtonWrapper style={style} onClick={onClick}>
            {text}
        </ButtonWrapper>
    )
}