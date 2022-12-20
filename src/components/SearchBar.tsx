import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

import './SearchBar.scss';

interface Props {
  searchFor: string;
  onSubmitSearch: (searchQuery: string) => void;
}

const SearchBar = ({ onSubmitSearch, searchFor }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    onSubmitSearch(search);
    setSearchParams({ search: debouncedSearch, page: '1' });
  }, [debouncedSearch]);

  return (
    <div className='form-search'>
      <label className='form-search__label' htmlFor='search'>
        Search {searchFor}
      </label>
      <div className='form-search__inputs'>
        <input
          className='form-search__input'
          type='search'
          name='search'
          id='search'
          placeholder='enter a name...'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          maxLength={50}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
