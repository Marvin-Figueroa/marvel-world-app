import React from 'react';
import { Link } from 'react-router-dom';
import { IStory } from '../models/story';
import './StoryListItem.scss';

type Props = {
  story: IStory;
};

function StoryListItem({ story }: Props) {
  return (
    <article className='story-item'>
      <Link to={`/stories/${story.id}`} className='story-item__title'>
        {story.title || 'No title available'}
      </Link>
    </article>
  );
}

export default StoryListItem;
