import styled from 'styled-components';

export const EditContainer = styled.div `
    width: 50%;

    padding-top: 20px;
    padding-bottom: 80px;
    
    position: absolute;
    top: 80px;

    display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;

    > * {
        width: 100%;
    }

    @media screen and (max-width: 728px) {
        width: 90%;
      }
    
`

export const EditButtonContainer = styled.div `
    display: flex;
    justify-content: space-between;
`