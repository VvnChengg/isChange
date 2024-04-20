import styled from 'styled-components';

export const ButtonWrapper = styled.div `
    width: 100px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 15px;
    background-color: ${props => props.theme.main};

    color: ${props => props.theme.fill};

    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.fill};
        color: ${props => props.theme.active};
        border: solid 2px ${props => props.theme.active};
        box-shadow: 2px 2px 2px ${props => props.theme.shadow};
    }
`