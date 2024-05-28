import styled from 'styled-components';

export const CommentContainer = styled.div `
    width: 100%;
`

export const CommentWrapper = styled.div `
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;

    margin-bottom: 5px;
`

export const CommentLeft = styled.div `
    display: flex;
        align-items: center;
        gap: 5px;
`

export const CommentName = styled.div `
    color: ${props => props.theme.main};
    text-align: left;
    white-space: nowrap;
`

export const CommentContent = styled.div `
    margin-left: 5px;
    text-align: left;
    white-space: wrap;
`

export const CommentTime = styled.div `
    font-size: 15px;
    color: #999;
    text-align: right;
    width: 20%;
    vertical-align: top; 
`