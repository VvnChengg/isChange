import styled from 'styled-components';
import { MdPerson } from 'react-icons/md';


export const StyledMdPerson = styled(MdPerson)`
    height: 32px;
    width: 32px;
    font-size: 30px;
    color: #008CD9;
    cursor: pointer;

    &:hover {
        color: #66C2FF;
    }
`;
