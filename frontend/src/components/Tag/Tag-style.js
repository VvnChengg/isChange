import styled from 'styled-components';

export const TagWrapper = styled.div `
    width: 60px;
    padding: 2px;

    background: ${props => props.theme[props.type]};
    color: ${props => props.theme.fill};
`