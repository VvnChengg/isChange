import styled from 'styled-components';

export const DetailContainer = styled.div `
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

    @media (max-width: 600px) {
        max-width: 80%;
    }

    @media (min-width: 600px) and (max-width: 900px) {
        max-width: 80%;
    }

    @media (min-width: 900px) and (max-width: 1200px) {
        max-width: 80%;
    }

    @media (min-width: 1200px) {
        max-width: 60%;
    }

`

export const DetailButtonContainer = styled.div `
    display: flex;
    justify-content: space-between;
`