import { PersonalMenu } from "./PersonalMenu";
import { useState } from "react";
import { useIntl } from 'react-intl';


import { 
    Wrapper, 
    MenuWrapper,
    StyledMdArticle
} from './PersonalPostButton-style';



export default function PersonalPostButton( {openMenu, toggleMenu} ) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const intl = useIntl();

    function onClick() {
        toggleMenu('personal');
    }


    return (
        <>
            <Wrapper>
                <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={onClick}>
                    <StyledMdArticle/>
                </button>

                <MenuWrapper>
                    <PersonalMenu
                        isOpen={openMenu === 'personal'}
                        setIsOpen={setIsMenuOpen}
                    />
                </MenuWrapper>
            </Wrapper>
        </>

    )
}