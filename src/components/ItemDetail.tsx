import React from 'react';
import { Thumbnail } from '../models/thumbnail';
import ImageGallery from './ImageGallery';
import './ItemDetail.scss';

type Props = {
  thumbnail?: Thumbnail | null;
  title?: string;
  description?: string;
  images?: Thumbnail[];
};

function ItemDetail({ thumbnail, title, description, images }: Props) {
  return (
    <>
      <div className='item'>
        <img
          className='item__image'
          src={
            thumbnail
              ? thumbnail.path + '/standard_xlarge.' + thumbnail.extension
              : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          }
          alt={title}
        />
        <div className='item__text'>
          <h2 className='item__title'>{title}</h2>
          <p className='item__description'>
            {description || 'No description available.'}
          </p>
        </div>
      </div>
      {images && (
        <>
          <h2 className='image-galley__title'>Images</h2>
          <ImageGallery images={images} />
        </>
      )}
    </>
  );
}

export default ItemDetail;
