import styled from 'styled-components';

export const UserIcon = styled.div`
    width: 136px;
    height: 136px;
    background-image: url('${props => props.src || '/icons/profile.png'}');
    background-position: center; // Ensure the image is always in the center
    background-repeat: no-repeat; // Image should not repeat
    background-size: cover; // Image should cover the entire content area
    border-radius: 50%; // Make the image round
`

export const EditProfileButton = styled.button`
    width: 40px;
    height: 40px;
    background-image: url('/icons/editprofile.png');
    background-color: transparent; // Make the button transparent by default
    background-position: center; // Ensure the image is always in the center
    background-repeat: no-repeat; // Image should not repeat
    background-size: cover; // Image should cover the entire content area
    border: none; // Remove the default button border
    cursor: pointer; // Change the cursor to a hand when hovering over the button

    &:hover {
        background-color: rgba(0, 0, 0, 0.1); // Change the background color to a semi-transparent black when hovering over the button
    }
`;