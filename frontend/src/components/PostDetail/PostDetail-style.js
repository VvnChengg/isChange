import styled from 'styled-components';

export const PostDetailWrapper = styled.div`
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

    overflow-x: scroll;
    overflow-y: auto;
`

export const PostDetailTitle = styled.div`
    font-weight: 800;
    font-size: 28px;
    line-height: 130%;

    display: flex;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;

    @media screen and (max-width: 500px) {
        font-size: 20px;
    }

    min-height: 50px;
`

export const PostDetailRow = styled.div`
    height: 25px;
    margin-bottom: 2px;
    display: flex;
    gap: 5px;

    color: ${props => props.theme.text};

    @media screen and (max-width: 500px) {
        height: 15px;
        font-size: 14px;
        line-height: 15px;
        margin-bottom: 0.2px;
    }
`

export const PostDetailIcon = styled.div`
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

export const PostDetailContent = styled.div`
    text-align: left;
    
    @media screen and (max-width: 500px) {
        font-size: 14px;
    }
`

export const PostDetailImage = styled.img`
    max-height: 70%;
`;