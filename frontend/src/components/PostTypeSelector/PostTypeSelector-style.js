import styled from 'styled-components';

export const SelctorWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
`

export const SelctorButton = styled.div `
    padding: 2px 3px 2px 3px;
    color: ${props => 
        props.selected
        ? (props.type === 'all' ? props.theme.main : props.theme[props.type])
        : props.theme.text};

    cursor: pointer;

    &:hover {
        background-color: ${props =>
            props.type === 'all' ? props.theme.main : props.theme[props.type]};

        color: ${props => props.theme.background};
    }
`