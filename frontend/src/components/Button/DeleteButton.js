import {  FaTrash } from 'react-icons/fa';
import './DeleteButton.css'


const DeleteButton = ({ onClick }) => {
  return (
    <button className='self-post-delete-button' onClick={onClick}><FaTrash /></button>
  );
};

export default DeleteButton;