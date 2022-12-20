import React from 'react';
import { Link } from 'react-router-dom';
import { IComic } from '../models/comic';
import './ComicListItem.scss';

type Props = {
  comic: IComic;
};

function ComicListItem({ comic }: Props) {
  return (
    <article className='comic-item'>
      <img
        className='comic-item__image'
        src={
          comic.thumbnail.path + '/standard_xlarge.' + comic.thumbnail.extension
        }
        alt={comic.title}
      />
      <div className='comic-item__text'>
        <p className='comic-item__title'>
          <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
        </p>
      </div>
    </article>
  );
}

export default ComicListItem;
