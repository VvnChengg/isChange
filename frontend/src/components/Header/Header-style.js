import styled from 'styled-components';

export const HeaderWrapper = styled.div `
    width: 100%;
    height: 80px;

    position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
    
    background: ${props => props.theme.main};
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

    color: ${props => props.theme.title};
    text-shadow: 2px 2px 2px ${props => props.theme.shadow};

    cursor: pointer;

    &:hover {
        color: ${props => props.theme.active};
        text-shadow: 
            -2px -2px 0 ${props => props.theme.title},  
            2px -2px 0 ${props => props.theme.title},
            -2px 2px 0 ${props => props.theme.title},
            2px 2px 0 ${props => props.theme.title},
            4px 4px 4px ${props => props.theme.shadow};
    }
    z-index: 3;

    @media screen and (max-width: 500px) {
        display: none;
    }
`

export const HeaderLogo = styled.div `
    width: 40px;
    height: 40px;

    margin: 0 12px 0 20px;

    border-radius: 50%;

    background-image: url(logo.png);
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #E0F0FF;

    display: none;

    &:hover {
        box-shadow: 2px 2px 2px ${props => props.theme.shadow};
    }

    @media screen and (max-width: 500px) {
        display: block;
    }
`

export const HeaderSearchContainer = styled.div `
    width: 30%;

    @media screen and (max-width: 500px) {
        width: 50%;
    }
`

export const HeaderButtonContainer = styled.div `
    height: 25px;
    
    position: absolute;
        right: 30px;
        bottom: 20px;

    display: flex;
        gap: 1px;
        align-items: center;
        z-index: 3;

    @media screen and (max-width: 500px) {
        right: 20px;
        gap: 0;
    }
`

export const HeaderButton = styled.div `
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 5px;

    color: ${props => props.theme.title};
    text-align: center;
    font-weight: 500;

    cursor: pointer;

    &:hover {
        background: ${props => props.theme.title};
        box-shadow: 2px 2px 2px ${props => props.theme.shadow};
        color: ${props => props.theme.active};
    }
    z-index: 3;
`

export const HeaderIcon = styled.div `
    height: 100%;

    padding: 4px;
    border-radius: 5px;

    cursor: pointer;

    & path {
        fill: ${props => props.theme.title};
    }

    &:hover {
        background: ${props => props.theme.title};
        box-shadow: 2px 2px 2px ${props => props.theme.shadow};

        & path {
            fill: ${props => props.theme.active};
        }
    }
    z-index: 3;
`