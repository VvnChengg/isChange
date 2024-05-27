import styled from 'styled-components';

export const HomeContainer = styled.div `
    width: 50%;
    height: calc(100% - 80px);
    
    position: absolute;
        top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1200px) {
        top: 130px;
        width: 55%;
    }

    @media screen and (max-width: 1100px) {
        width: 60%;
    }

    @media screen and (max-width: 1000px) {
        width: 70%;
    }

    @media screen and (max-width: 900px) {
        width: 80%;
    }

    @media screen and (max-width: 800px) {
        width: 90%;
    }
    
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

    @media screen and (max-width: 500px) {
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
        top: 80px;
        z-index: 2;
    
    padding: 20px 0 10px 0;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1200px) {
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