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

export const StyledLinkIcon = styled.img`
    width: 50px; // 設定寬度為 50 像素
    height: auto; // 高度自動調整以保持圖標的比例

    &:hover {
        filter: brightness(50%);
    }
`;

export const StyledButtonContainer = styled.div`
    display: flex; // 將此元素設定為 flex 容器
    justify-content: space-between; // 將子元素均勻分佈在容器中
    flex-wrap: nowrap; // 防止子元素換行
`;

export const StyledButton = styled.button`
    border: none; // 移除邊框
    background: transparent; // 設定背景為透明
    cursor: pointer; // 設定游標為手指
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;