import styled from 'styled-components';

export const StyledImg = styled.img`
    max-width: 4%;
    height: auto;
    margin: 1%;
    object-fit: contain;

    &:hover {
        filter: brightness(0.8);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        max-width: 10%;
    }
`;
