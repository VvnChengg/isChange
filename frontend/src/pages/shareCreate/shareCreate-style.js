import styled from 'styled-components';

export const CreateContainer = styled.div `
    width: 50%;

    padding: 20px 0;
    
    position: absolute;
    top: 80px;
    padding-bottom: 80px;

    display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    > * {
        width: 100%;
    }

    @media screen and (max-width: 500px) {
        width: 90%;
        height: calc(100% - 130px);
        padding-bottom: 20px;
        display: block;
        overflow: scroll;
    }
`

export const CreateButtonContainer = styled.div `
    display: flex;
    justify-content: space-between;
`