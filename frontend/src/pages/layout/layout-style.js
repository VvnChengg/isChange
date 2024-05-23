import styled from 'styled-components';

export const LayoutWrapper = styled.div`
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

export const Footer = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    align-items: center;


    @media (max-width: 768px) {
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9999;
        background-color: white;
        border-top: 1px solid #008cd9;  // 修改为 border-top
        width: 100%;
        height: 50px;
        align-items: center;  // 修改为 align-items
    }
`;
