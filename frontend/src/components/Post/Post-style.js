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

export const PostTopBar = styled.div `
    display: flex;
    align-items: center;
    gap: 7px;
`

export const PostInfoContainer = styled.div `
    display: flex;
    align-items: center;
    gap: 7px;

    flex-wrap: wrap;

    @media screen and (max-width: 700px) {
        width: 60%;
        display: block;
    }
`

export const PostInfo = styled.div `
    display: flex;
    align-items: center;
    gap: 3px;

    float: left;
    text-align: left;
`

export const PostIcon = styled.div `
    width: 20px;
    height: 20px;

    margin-left: 5px;

    & svg {
        width: 100%;
        height: 100%;
    }
    
    & path {
        fill: ${props => props.theme.text};
    }
`

export const PostTitle = styled.div `
    width: 100%;

    font-weight: 800;
    font-size: 28px;
    line-height: 130%;
    text-align: left;

    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;

    @media screen and (max-width: 500px) {
        font-size: 24px;
    }
`

export const PostPreview = styled.div `
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;
    text-align: left;

    color: #6B6B6B;

    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;

    @media screen and (max-width: 500px) {
        font-size: 16px;
    }
`

export const PostImage = styled.img `
    width: 100px;
    height: 100px;

    position: absolute;
        right: 0;

    background: #D9D9D9;
    border-radius: 20px;

    object-fit: cover;
`