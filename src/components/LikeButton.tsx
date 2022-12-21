import { FaRegHeart, FaHeart } from 'react-icons/fa';
import './LikeButton.scss';

type Props = {
  liked: boolean;
  onToggle: () => void;
};

function LikeButton({ liked, onToggle }: Props) {
  return (
    <button onClick={onToggle} className='like-button'>
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default LikeButton;
