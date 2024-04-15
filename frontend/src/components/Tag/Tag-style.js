import styled from 'styled-components';

export const TagWrapper = styled.div `
    width: 50px;
    padding: 2px;

    background: #${props => props.color};
    color: white;
`