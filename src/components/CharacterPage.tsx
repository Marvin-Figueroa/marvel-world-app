import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedCharacters } from '../services/characters';
import { RootState } from '../store/store';
import * as actions from '../store/charactersSlice';
import CharacterList from './CharacterList';
import Pagination from './Pagination';
import { HashLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import './CharacterPage.scss';

function CharacterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || ''
  );

  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    getPaginatedCharacters(1, 10, searchParams.get('search') || '').then(
      (data) => {
        if (data) {
          dispatch(actions.charactersLoaded(data.results));
          setTotalItems(data.total);
        }
        setLoadingCharacters(false);
      }
    );
  }, []);

  function handlePageChange(pageNumber: number) {
    setLoadingCharacters(true);
    setSearchParams({ search: search, page: pageNumber.toString() });

    getPaginatedCharacters(
      pageNumber,
      10,
      searchParams.get('search') || ''
    ).then((data) => {
      if (data) {
        dispatch(actions.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
    setCurrentPage(pageNumber);
  }

  function handleSearch(query: string) {
    setLoadingCharacters(true);
    setSearch(query);
    getPaginatedCharacters(1, 10, query).then((data) => {
      if (data) {
        dispatch(actions.charactersLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingCharacters(false);
    });
    setCurrentPage(1);
  }

  return (
    <>
      <SearchBar searchFor='character' onSubmitSearch={handleSearch} />
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
        currentPage={currentPage}
      />
    </>
  );
}

export default CharacterPage;
