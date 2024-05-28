import styled from 'styled-components';

export const ChatRoomWrapper = styled.div `
    width: 100%;
    max-height: 100%;
`

export const ChatRoomContainer = styled.div `
    width: 100%;
    height: 90px;
    padding: 10px 0;
    display: flex;

    border-bottom: ${props => props.showBottom ? `1px solid ${props.theme.main}` : ''};

    cursor: pointer;
`

export const ChatRoomAvatar = styled.div `
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;

    margin-right: 10px;
    overflow: hidden;
`

export const ChatRoomContent = styled.div `
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ChatRoomRow = styled.div `
    display: flex;
    justify-content: space-between;
`

export const ChatRoomPreview = styled.div `
    width: 80%;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;
`