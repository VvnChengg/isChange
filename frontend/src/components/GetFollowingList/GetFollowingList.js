import { StyledMdPerson } from "./GetFollowingList-style"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../../App';

export default function GetFollowingList() {
    const navigate = useNavigate();

    function onClick() {
        navigate('member/following');
    }

    return(
        <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={onClick}>
            <StyledMdPerson />
        </button>
    )
}