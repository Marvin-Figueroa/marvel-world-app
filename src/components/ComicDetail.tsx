import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { ICharacter } from '../models/character';
import { IStory } from '../models/story';
import { getCharactersByComic } from '../services/characters';
import { getStoriesByComic } from '../services/stories';
import CharacterList from './CharacterList';
import ItemDetail from './ItemDetail';
import StoryList from './StoryList';
import './ComicDetail.scss';
import { getComicDetail } from '../services/comics';
import { IComic } from '../models/comic';

function ComicDetail() {
  const [comic, setComic] = useState<IComic | null>(null);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingComic, setLoadingComic] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getComicDetail(Number(id)).then((data) => {
      if (data) {
        setComic(data);
      }
      setLoadingComic(false);
    });

    getCharactersByComic(Number(id)).then((data) => {
      if (data) {
        setCharacters(data.results);
      }
      setLoadingCharacters(false);
    });

    getStoriesByComic(Number(id)).then((data) => {
      if (data) {
        setStories(data.results);
      }
      setLoadingStories(false);
    });
  }, []);

  return (
    <main className='comic-detail'>
      {loadingComic ? (
        <HashLoader color='#dc143c' />
      ) : (
        <ItemDetail
          thumbnail={comic?.thumbnail}
          title={comic?.title}
          description={comic?.description}
          images={comic?.images}
        />
      )}
      <section className='comic-detail__section'>
        <h2>Comic&apos;s Characters</h2>
        {loadingCharacters ? (
          <HashLoader color='#dc143c' />
        ) : (
          <CharacterList characters={characters} />
        )}
      </section>
      <section className='comic-detail__section'>
        <h2>Comic&apos;s Stories</h2>
        {loadingStories ? (
          <HashLoader color='#dc143c' />
        ) : (
          <StoryList stories={stories} />
        )}
      </section>
    </main>
  );
}

export default ComicDetail;
