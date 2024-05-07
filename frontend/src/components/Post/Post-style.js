import styled from 'styled-components';

export const PostWrapper = styled.div `
    width: 100%;

    position: relative;
    
    padding: 20px 0 20px 0;

    border-bottom: ${props => props.showDivider ? '2px solid #008CD9' : ''};

    display: flex;
    flex-direction: column;
    gap: 10px;

    cursor: pointer;
`

export const PostIcon = styled.div `
    width: 20px;
    height: 20px;

    margin-left: 5px;

    background-image: url('/icons/${props => props.src}.png');
    background-size: cover;
`

export const PostTitle = styled.div `
    font-weight: 800;
    font-size: 28px;
    line-height: 130%;

    display: flex;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;
`

export const PostPreview = styled.div `
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;

    display: flex;
    align-items: center;

    color: #6B6B6B;

    white-space: nowrap;
    overflow: hidden;
`

export const PostImage = styled.img `
    height: calc(100% - 40px);
    aspect-ratio: 1 / 1;

    position: absolute;
        right: 0;

    background: #D9D9D9;
    border-radius: 20px;

    object-fit: cover;
`