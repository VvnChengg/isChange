import styled from 'styled-components';

export const LayoutWrapper = styled.div `
    width: 100%;
    height: 100%;

    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        overflow: hidden;
    }
`