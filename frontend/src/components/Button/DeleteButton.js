import Icon from '../Icon';
import './DeleteButton.css'


const DeleteButton = ({ onClick }) => {
  return (
    <button className='self-post-delete-button' onClick={onClick}>
      <Icon.Trash />
    </button>
  );
};

export default DeleteButton;