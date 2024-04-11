import styled from 'styled-components';

export const UserIcon = styled.div `
    width: 136px;
    height: 136px;

    background-image: url('/icons/${props => props.src}.png');
    background-size: cover;
`