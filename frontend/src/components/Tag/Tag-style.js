import styled from 'styled-components';

export const TagWrapper = styled.div`
    width: 60px;
    padding: 2px;

    background: ${props => props.theme[props.type]};
    color: ${props => props.theme.fill};

    &:not(:first-child) {
        width: 110.4px; /* 等於圖片大小 */
        padding: 2px;
        background: ${props => props.theme[props.type]};
        color: ${props => props.theme.fill};
        margin-left: auto; 
    }
    z-index : 1;

`;