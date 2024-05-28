import styled from 'styled-components';

export const CreateContainer = styled.div `
    width: 50%;

    top: 80px;
    padding-top: 20px;
    padding-bottom: 80px;
    
    position: absolute;

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

export const CreateButtonContainer = styled.div `
    display: flex;
    justify-content: space-between;
`