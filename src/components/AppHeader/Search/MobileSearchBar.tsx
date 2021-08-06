import { SearchIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { searchPath } from 'libs/urlHelpers';

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: ${({ theme }) => `1px solid ${theme.colors['gray-300']}`};
  background: none;
  font-size: 1rem;
  padding: 0.75rem;
  padding-right: 2.5rem;
  border-radius: px-rem(5px);

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-300']};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0.75rem;
  cursor: pointer;
  outline: 0;
  border: none;
  background-color: transparent;
  padding: 0;
  line-height: 0;
`;

export const MobileSearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    window.location.assign(searchPath(searchValue));
  };

  return (
    <SearchForm id="search-form" action="/search" onSubmit={handleSubmit}>
      <StyledInput
        name="query"
        type="search"
        placeholder="Search our catalog"
        aria-label="search"
        value={searchValue}
        onChange={handleChange}
      />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchForm>
  );
};
