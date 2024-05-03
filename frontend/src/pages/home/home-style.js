import styled from 'styled-components';

export const PostContainer = styled.div `
    width: 50%;
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const PostSelector = styled.div `
    width: 20px;
    height: 20px;
    
    position: fixed;
        top: 100px;
        right: 20px;
        z-index: 2;

    cursor: pointer;
    
    &:hover path  {
        fill: ${props => props.theme.main};
    }
`