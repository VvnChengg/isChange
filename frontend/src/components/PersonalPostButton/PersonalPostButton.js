import Button from "../Button";
import { PersonalMenu } from "./PersonalMenu";
import { useState, useContext } from "react";
import { AuthContext } from '../../App';
import { useIntl } from 'react-intl';


import { 
    Wrapper, 
    MenuWrapper,
    StyledMdArticle
} from './PersonalPostButton-style';



export default function PersonalPostButton() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { token } = useContext(AuthContext);

    const intl = useIntl();

    function onClick() {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        token &&
        <>
            <Wrapper>
                <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={onClick}>
                    <StyledMdArticle/>
                </button>

                <MenuWrapper>
                    <PersonalMenu
                        isOpen={isMenuOpen}
                        setIsOpen={setIsMenuOpen}
                    />
                </MenuWrapper>
            </Wrapper>
        </>

    )
}