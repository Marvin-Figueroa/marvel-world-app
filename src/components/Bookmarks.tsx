import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CharacterList from './CharacterList';
import ComicList from './ComicList';
import StoryList from './StoryList';
import * as actionsCharacters from '../store/charactersSlice';
import * as actionsComics from '../store/comicsSlice';
import * as actionsStories from '../store/storiesSlice';

import './Bookmarks.scss';

function Bookmarks() {
  const dispatch = useDispatch();

  const favCharacters = useSelector(
    (state: RootState) => state.characters.favoriteCharacters
  );
  const favComics = useSelector(
    (state: RootState) => state.comics.favoriteComics
  );
  const favStories = useSelector(
    (state: RootState) => state.stories.favoriteStories
  );

  function handleClick() {
    dispatch(actionsCharacters.charactersUnBookmarkedAll());
    dispatch(actionsComics.comicsUnBookmarkedAll());
    dispatch(actionsStories.storiesUnBookmarkedAll());
  }

  return (
    <main className='bookmarks-container'>
      <button className='bookmarks-remove-btn' onClick={handleClick}>
        Remove All Bookmarks
      </button>
      <section className='characters-section'>
        <h2>Favorite Characters</h2>
        {<CharacterList characters={favCharacters} />}
      </section>
      <section className='comics-section'>
        <h2>Favorite Comics</h2>
        {<ComicList comics={favComics} />}
      </section>
      <section className='stories-section'>
        <h2>Favorite Stories</h2>
        {<StoryList stories={favStories} />}
      </section>
    </main>
  );
}

export default Bookmarks;
