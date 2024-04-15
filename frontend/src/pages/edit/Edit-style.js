import styled from 'styled-components';

export const UserIcon = styled.div`
    width: 136px;
    height: 136px;
    background-image: url('${props => props.src}');
    background-position: center; // Ensure the image is always in the center
    background-repeat: no-repeat; // Image should not repeat
    background-size: cover; // Image should cover the entire content area
    border-radius: 50%; // Make the image round
`