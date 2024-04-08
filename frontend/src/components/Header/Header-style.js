import styled from 'styled-components';

export const HeaderWrapper = styled.div `
    width: 100%;
    height: 80px;

    position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    
    background: linear-gradient(360deg, #E0F0FF 0%, #FFFFFF 100%);
    box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 40px 40px;

    display: flex;
    align-items: center;
`

export const HeaderTitle = styled.div `
    margin: 0 30px 0 30px;

    font-family: 'LilitaOne';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 130%;

    display: flex;
    align-items: center;

    color: #008CD9;
`

export const HeaderSearch = styled.input `
    width: 30%;

    border: 1px solid #008CD9;
    background: white;
`

export const HeaderButtonContainer = styled.div `
    width: 50px;
    height: 20px;
    
    position: absolute;
        right: 30px;
        bottom: 20px;

    display: flex;
        gap: 5px;
        align-items: center;
`

export const HeaderButton = styled.div `
    width: 20px;
    color: #008CD9;
    text-align: center;
`

export const HeaderIcon = styled.div `
    width: 15px;
    height: 15px;

    background-image: url('/icons/${props => props.src}.png');
    background-size: cover;
`