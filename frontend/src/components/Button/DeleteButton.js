import Icon from '../Icon';
import './DeleteButton.css'


const DeleteButton = ({ onClick }) => {
  return (
    <div className='self-post-delete-button' onClick={onClick}>
      <Icon.Trash />
    </div>
  );
};

export default DeleteButton;