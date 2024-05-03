import styled from 'styled-components';

export const SideBarWrapper = styled.div `
    width: ${props => props.show ? '250px' : 0};
    height: 100%;

    position: fixed;
        top: 0;
        right: 0;
        z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    background-color: ${props => props.theme.background};
    border-radius: 0 0 0 40px;
    box-shadow:  -5px 0px 10px 1px ${props => props.theme.shadow},
        0 10px 10px -10px ${props => props.theme.shadow};
    
    transition: 0.5s ease;

    // @media screen and (max-width: 500px) {
    //     width: 200px;
    //     transform: ${props => props.show ? 'translate(0)' : 'translate(-100%)'};
    //     box-shadow: ${props => props.show ? '500px 0 0 500px rgba(0, 0, 0, 0.4)' : '' };
    // }
`

export const SideBarContainer = styled.div `
    width: 100%;
    height: 100%;

    padding: 20px;

    position: relative;
        top: 110px;

    text-align: left;
`

export const SideBarTitle = styled.div `
    margin-top: 10px;
    color: ${props => props.theme.text};
    font-weight: 700;
`

export const SideBarOptionsContainer = styled.div `
    display: flex;
`

export const SideBarOption = styled.div `
    color: ${props => props.selected ? props.theme.main : props.theme.text};

    cursor: pointer;

    &:hover {
        color: ${props => props.theme.main}
    }
`