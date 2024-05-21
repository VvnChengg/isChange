import Button from "../Button";
import { PersonalMenu } from "./PersonalMenu";
import { useState, useContext } from "react";
import styled from 'styled-components';
import { AuthContext } from '../../App';
import { useIntl } from 'react-intl';



const MenuWrapper = styled.div`
    position: fixed;
    left: 0.5%;
    bottom: 72px; // adjust this value as needed
    transform: 'translate(-50%, -50%)';
    z-index: 1000;
    white-space: nowrap;
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
        <Button
            style = {{
                width: '100px',
                position: "fixed",
                left: "1%",
                bottom: "20px",
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
        </>

    )
}