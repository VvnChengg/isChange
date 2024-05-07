import styled from 'styled-components';

export const PostContainer = styled.div `
    width: 50%;
    min-height: calc(100% - 80px);
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SpinContainer = styled.div `
    width: 50%;
    min-height: calc(100% - 80px);
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NoContent = styled.div `
    margin-top: 20px;
    font-weight: 700;
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