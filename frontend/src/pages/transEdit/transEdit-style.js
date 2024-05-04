import styled from 'styled-components';

export const EditContainer = styled.div `
    width: 50%;
    height: calc(100% - 80px);

    padding-top: 20px;
    
    position: absolute;
        top: 80px;

    display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    > * {
        width: 100%;
    }
`

export const EditButtonContainer = styled.div `
    display: flex;
    justify-content: space-between;
`