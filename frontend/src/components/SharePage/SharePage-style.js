import styled from 'styled-components';
import { FacebookIcon, TwitterIcon, EmailIcon, LineIcon, FacebookMessengerIcon } from 'react-share';

export const StyledFacebookIcon = styled(FacebookIcon)`
    width: 80%;
    &:hover {
        filter: brightness(0.8); /* 鼠標hover的亮度 */
    }
`;

// 为其他图标也创建 styled-components
export const StyledTwitterIcon = styled(TwitterIcon)`
    width: 80%;
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledEmailIcon = styled(EmailIcon)`
    width: 80%;
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledLineIcon = styled(LineIcon)`
    width: 80%;
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledFacebookMessengerIcon = styled(FacebookMessengerIcon)`
    width: 80%;
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledImg = styled.img`
    max-width: 4%;
    height: auto;
    margin: 1%;

    &:hover {
        filter: brightness(0.8);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        max-width: 10%;
    }
`;