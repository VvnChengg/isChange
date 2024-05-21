import Button from "../Button";
import { PersonalMenu } from "./PersonalMenu";
import { useState, useContext } from "react";
import styled from 'styled-components';
import { AuthContext } from '../../App';
import { useIntl } from 'react-intl';



const MenuWrapper = styled.div`
    bottom: 50px; // adjust this value as needed
    z-index: 1000;
    white-space: nowrap;
    position: absolute;
`;

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    z-index: 1000;
    bottom: 10px;
`;


export default function PersonalPostButton (){
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { token } = useContext(AuthContext);

    const intl = useIntl();

    function onClick(){
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        token && 
        <>
        <Wrapper>
        <Button
            style = {{
                width: '100px',
                zIndex: "1000",
            }}
            text = {intl.formatMessage({ id: 'personalbutton.title'})}
            onClick = {onClick}
        />
        <MenuWrapper>
            <PersonalMenu
                isOpen = {isMenuOpen}
                setIsOpen = {setIsMenuOpen}
            />
        </MenuWrapper>
        </Wrapper>
        </>

    )
}