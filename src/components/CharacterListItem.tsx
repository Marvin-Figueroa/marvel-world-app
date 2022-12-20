import React from 'react';
import { Link } from 'react-router-dom';
import { ICharacter } from '../models/character';
import './CharacterListItem.scss';

type Props = {
  character: ICharacter;
};

function CharacterListItem({ character }: Props) {
  return (
    <article className='character-item'>
      <img
        className='character-item__image'
        src={
          character.thumbnail.path +
          '/standard_xlarge.' +
          character.thumbnail.extension
        }
        alt={character.name}
      />
      <p className='character-item__name'>
        <Link to={`/characters/${character.id}`}>{character.name}</Link>
      </p>
    </article>
  );
}

export default CharacterListItem;
