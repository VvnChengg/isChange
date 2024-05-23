import styled from 'styled-components';

export const HomeContainer = styled.div `
    width: 50%;
    height: calc(100% - 80px);
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media screen and (max-width: 500px) {
        top: 120px;
        width: 90%;

        overflow: scroll;
    }
`

export const PostContainer = styled.div `
    width: 100%;

    position: absolute;
        top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;


    @media screen and (max-width: 768px) {
        overflow: scroll;
        padding-bottom: 100px;
    }
`

export const SpinContainer = styled.div `
    width: 50%;
    height: calc(100% - 80px);
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        top: 120px;
        width: 100%;
        height: calc(100% - 120px);
    }
`

export const NoContent = styled.div `
    margin-top: 20px;
    font-weight: 700;
`

export const HomeTopBar = styled.div `
    width: 95%;

    position: fixed;
        top: 100px;
        z-index: 2;
    
    padding-bottom: 10px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 500px) {
        width: 90%;
        background-color: ${props => props.theme.fill};
    }
`

export const PostSelector = styled.div `
    width: 20px;
    height: 20px;

    z-index: 2;

    cursor: pointer;
    
    &:hover path {
        fill: ${props => props.theme.main};
    }
`