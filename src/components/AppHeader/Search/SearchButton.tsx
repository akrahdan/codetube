import { SearchIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

const SearchIconButton = styled.button`
  background-color: transparent;
  padding-top: 0.5rem;
  border: transparent;
  &:hover {
    color: ${({ theme }) => theme.colors.hyper};
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: ${({ theme }) => `0.3rem auto ${theme.colors.navy}`};
  }
`;

export type SearchProps = {
  toggleSearch: () => void;
};

export const SearchButton: React.FC<SearchProps> = ({ toggleSearch }) => {
  return (
    <SearchIconButton
      aria-label="Search Codecademy Content"
      data-testid="header-search"
      onClick={toggleSearch}
    >
      <SearchIcon size={20} />
    </SearchIconButton>
  );
};
