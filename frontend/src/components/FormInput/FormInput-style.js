import styled from 'styled-components';

export const FormTextBox = styled.div `
    padding: 15px;

    border: 2px solid #008cd9;
    border-radius: 15px;
    
    margin-bottom: 10px;

    > * {
        width: 80%;
        margin: auto;
    }
`

export const FormTextTitle = styled.div `
    color: #6B6B6B;
    text-align: left;
    font-size: 14px;
`

export const FormTextInput = styled.input `
    min-width: 50px;

    border: 0;
    padding: 0;

    outline: none;
`

export const FormTextarea = styled.textarea `
    width: 100%;
    border: 0;
    padding: 0;

    outline: none;
`

export const FormTextSelect = styled.select`
    border: 0;
    padding: 0;
    outline: none;
    /* 你可以在這裡添加更多的 CSS 樣式 */
`;