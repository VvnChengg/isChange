import {
    ButtonWrapper,
    SecondaryButtonWrapper
} from './Button-style.js';

export default function Button({style, text, onClick, secondary}) {
    return (
        <>
            {secondary ?
                <SecondaryButtonWrapper style={style} onClick={onClick}>
                    {text}
                </SecondaryButtonWrapper>
                :
                <ButtonWrapper style={style} onClick={onClick}>
                    {text}
                </ButtonWrapper>
            }
        </>
    )
}