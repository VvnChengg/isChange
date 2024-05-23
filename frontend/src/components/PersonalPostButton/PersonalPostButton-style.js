import styled from 'styled-components';
import { MdArticle } from "react-icons/md";



export const MenuWrapper = styled.div`
    bottom: 50px; // adjust this value as needed
    z-index: 1000;
    white-space: nowrap;
    position: absolute;
    border: 1px solid #008cd9 !important; // 修改为 border
    border-radius: 8px;
    overflow: hidden;
`;

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    z-index: 1000;
`;

export const StyledMdArticle = styled(MdArticle)`
    height: 32px;
    width: 32px;
    font-size: 30px;
    color: #008CD9;
    cursor: pointer;

    &:hover {
        color: #66C2FF;
    }
`;
