import styled from 'styled-components';

export const PostDetailWrapper = styled.div`
    width: 100%;
    min-height: 70%;

    position: relative;
    
    margin-bottom: 20px;
    padding: 30px;
    padding-right: 0px;

    border: 2px solid #008CD9;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

`

export const InnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 30px; // adjust this value as needed
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
`;

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
export const PostDetailButtonContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media (min-width: 600px) {
        flex-direction: row;
    }

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
    max-width: 50%;

    @media screen and (max-width: 1024px) {
        max-width: 70%;
    }
`;