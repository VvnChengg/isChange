import styled from 'styled-components';

export const PostDetailWrapper = styled.div `
    width: 100%;
    min-height: 70%;

    position: relative;
    
    margin-bottom: 20px;
    padding: 30px;

    border: 2px solid #008CD9;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const PostDetailTitle = styled.div `
    font-weight: 800;
    font-size: 28px;
    line-height: 130%;

    display: flex;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;
`

export const PostDetailRow = styled.div `
    height: 25px;
    margin-bottom: 2px;
    display: flex;
    gap: 5px;

    color: ${props => props.theme.text};
`

export const PostDetailIcon = styled.div `
    height: 100%;
    aspect-ratio: 1 / 1;

    & svg {
        width: 100%;
        height: 100%;
    }
    
    & path {
        fill: ${props => props.theme.text};
    }
`

export const PostDetailContent = styled.div `
    text-align: left;
`