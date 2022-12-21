import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedCharacters } from '../services/characters';
import { RootState } from '../store/store';
import * as actions from '../store/charactersSlice';
import CharacterList from './CharacterList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import SearchBar from './SearchBar';
import './CharacterPage.scss';
import FilterSelect from './FilterSelect';

const comicsWithCharacters = ['1994', '1158', '1332', '1590', '1689', '1749'];

const storiesWithCharacters = ['477', '479', '488', '489', '498', '535'];

function CharacterPage() {
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const filters = useSelector((state: RootState) => state.characters.filters);

  useEffect(() => {
    getPaginatedCharacters().then((data) => {
      if (data) {
        dispatch(actions.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
  }, []);

  function handlePageChange(pageNumber: number) {
    dispatch(actions.charactersFilteredByPage(pageNumber));
    setLoadingCharacters(true);

    getPaginatedCharacters(
      pageNumber,
      10,
      filters.name,
      filters.comic,
      filters.story
    ).then((data) => {
      if (data) {
        dispatch(actions.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
  }

  function handleSearch(query: string) {
    dispatch(actions.charactersFilteredByName(query));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 10, query, filters.comic, filters.story).then(
      (data) => {
        if (data) {
          dispatch(actions.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  function handleComicSelectFilterChange(comic: string) {
    const validatedComic = comic === 'Select an option' ? '' : comic;

    dispatch(actions.charactersFilteredByComic(validatedComic));
    dispatch(actions.charactersFilteredByStory(''));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 10, filters.name, validatedComic, '').then(
      (data) => {
        if (data) {
          dispatch(actions.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  function handleStorySelectFilterChange(story: string) {
    const validatedStory = story === 'Select an option' ? '' : story;
    dispatch(actions.charactersFilteredByStory(validatedStory));
    dispatch(actions.charactersFilteredByComic(''));
    setLoadingCharacters(true);

    getPaginatedCharacters(1, 10, filters.name, '', validatedStory).then(
      (data) => {
        if (data) {
          dispatch(actions.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }

  return (
    <>
      <SearchBar searchFor='character' onSubmitSearch={handleSearch} />
      <div className='filters-container'>
        <FilterSelect
          label='comic'
          value={filters.comic}
          options={comicsWithCharacters}
          onFilterChange={handleComicSelectFilterChange}
        />
        <FilterSelect
          label='story'
          value={filters.story}
          options={storiesWithCharacters}
          onFilterChange={handleStorySelectFilterChange}
        />
      </div>
      {loadingCharacters ? (
        <HashLoader color='#dc143c' />
      ) : (
        <CharacterList characters={characters} />
      )}
      <Pagination
        totalItems={totalItems}
        pageSize={10}
        onPageChange={handlePageChange}
        siblingCount={1}
        currentPage={Number(filters.page) || 1}
      />
    </>
  );
}

export default CharacterPage;
