import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICharacter } from '../models/character';
import './CharacterListItem.scss';
import LikeButton from './LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/charactersSlice';
import { RootState } from '../store/store';

type Props = {
  character: ICharacter;
};

function CharacterListItem({ character }: Props) {
  const favCharacters = useSelector(
    (state: RootState) => state.characters.favoriteCharacters
  );
  const [isFavCharacter, setIsFavCharacter] = useState(
    () =>
      favCharacters.findIndex((favChar) => favChar.id === character.id) !== -1
  );
  const dispatch = useDispatch();

  function handleClick() {
    setIsFavCharacter((prevIsFavCharacter) => !prevIsFavCharacter);

    if (isFavCharacter) {
      dispatch(actions.characterUnBookmarked(character.id));
    } else {
      dispatch(actions.characterBookmarked(character));
    }
  }

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
      <div className='character-item__footer'>
        <p className='character-item__name'>
          <Link to={`/characters/${character.id}`}>{character.name}</Link>
        </p>
        <LikeButton liked={isFavCharacter} onToggle={handleClick} />
      </div>
    </article>
  );
}

export default CharacterListItem;
