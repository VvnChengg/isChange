import { ButtonWrapper } from './Button-style.js';

export default function Button({text, onClick}) {
    return (
        <ButtonWrapper onClick={onClick}>
            {text}
        </ButtonWrapper>
    )
}