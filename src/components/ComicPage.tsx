import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedComics } from '../services/comics';
import { RootState } from '../store/store';
import * as actions from '../store/comicsSlice';
import ComicList from './ComicList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import SearchBar from './SearchBar';
import TagList from './TagList';

const formatTags = [
  'all',
  'comic',
  'magazine',
  'trade paperback',
  'hardcover',
  'digest',
  'graphic novel',
  'digital comic',
  'infinite comic',
];

function ComicPage() {
  const [loadingComics, setLoadingComics] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const comics = useSelector((state: RootState) => state.comics.comics);
  const filters = useSelector((state: RootState) => state.comics.filters);

  useEffect(() => {
    getPaginatedComics().then((data) => {
      if (data) {
        dispatch(actions.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }, []);

  function handlePageChange(pageNumber: number) {
    dispatch(actions.comicsFilteredByPage(pageNumber));

    setLoadingComics(true);

    getPaginatedComics(pageNumber, 10, filters.title, filters.format).then(
      (data) => {
        if (data) {
          dispatch(actions.comicsLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingComics(false);
      }
    );
  }

  function handleSearch(query: string) {
    dispatch(actions.comicsFilteredByTitle(query));
    setLoadingComics(true);

    getPaginatedComics(1, 10, query, filters.format).then((data) => {
      if (data) {
        dispatch(actions.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }

  function handleTagChange(tag: string) {
    dispatch(actions.comicsFilteredByFormat(tag));
    setLoadingComics(true);

    getPaginatedComics(1, 10, filters.title, tag).then((data) => {
      if (data) {
        dispatch(actions.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
  }

  return (
    <>
      <SearchBar searchFor='comic' onSubmitSearch={handleSearch} />
      <TagList onTagChange={handleTagChange} tags={formatTags} />
      {loadingComics ? (
        <HashLoader color='#dc143c' />
      ) : (
        <ComicList comics={comics} />
      )}
      <Pagination
        totalItems={totalItems}
        pageSize={10}
        onPageChange={handlePageChange}
        siblingCount={1}
        currentPage={filters.page || 1}
      />
    </>
  );
}

export default ComicPage;
