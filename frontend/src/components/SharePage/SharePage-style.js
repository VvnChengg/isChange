import styled from 'styled-components';
import { FacebookIcon, TwitterIcon, EmailIcon, LineIcon, FacebookMessengerIcon } from 'react-share';

export const StyledFacebookIcon = styled(FacebookIcon)`
    &:hover {
        filter: brightness(0.8); /* 鼠標hover的亮度 */
    }
`;

// 为其他图标也创建 styled-components
export const StyledTwitterIcon = styled(TwitterIcon)`
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledEmailIcon = styled(EmailIcon)`
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledLineIcon = styled(LineIcon)`
    &:hover {
        filter: brightness(0.8);
    }
`;

export const StyledFacebookMessengerIcon = styled(FacebookMessengerIcon)`
    &:hover {
        filter: brightness(0.8);
    }
`;