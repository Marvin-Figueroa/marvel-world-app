import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedComics } from '../services/comics';
import { RootState } from '../store/store';
import * as actions from '../store/comicsSlice';
import ComicList from './ComicList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';

function ComicPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [loadingComics, setLoadingComics] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const dispatch = useDispatch();
  const comics = useSelector((state: RootState) => state.comics);
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || ''
  );

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
    setLoadingComics(true);
    setSearchParams({ search: search, page: pageNumber.toString() });

    getPaginatedComics(pageNumber, 10, searchParams.get('search') || '').then(
      (data) => {
        if (data) {
          dispatch(actions.comicsLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingComics(false);
      }
    );
    setCurrentPage(pageNumber);
  }

  function handleSearch(query: string) {
    setLoadingComics(true);
    setSearch(query);
    getPaginatedComics(1, 10, query).then((data) => {
      if (data) {
        dispatch(actions.comicsLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingComics(false);
    });
    setCurrentPage(1);
  }

  return (
    <>
      <SearchBar searchFor='comic' onSubmitSearch={handleSearch} />
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
        currentPage={currentPage}
      />
    </>
  );
}

export default ComicPage;
