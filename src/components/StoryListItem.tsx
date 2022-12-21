import { Link } from 'react-router-dom';
import { IStory } from '../models/story';
import LikeButton from './LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/storiesSlice';
import { RootState } from '../store/store';
import './StoryListItem.scss';
import { useState } from 'react';

type Props = {
  story: IStory;
};

function StoryListItem({ story }: Props) {
  const favStories = useSelector(
    (state: RootState) => state.stories.favoriteStories
  );
  const [isFavStory, setIsFavStory] = useState(
    () => favStories.findIndex((favStorie) => favStorie.id === story.id) !== -1
  );
  const dispatch = useDispatch();

  function handleClick() {
    setIsFavStory((prevIsFavStory) => !prevIsFavStory);

    if (isFavStory) {
      dispatch(actions.storyUnBookmarked(story.id));
    } else {
      dispatch(actions.storyBookmarked(story));
    }
  }

  return (
    <article className='story-item'>
      <Link to={`/stories/${story.id}`} className='story-item__title'>
        {story.title || 'No title available'}
      </Link>
      <LikeButton liked={isFavStory} onToggle={handleClick} />
    </article>
  );
}

export default StoryListItem;
