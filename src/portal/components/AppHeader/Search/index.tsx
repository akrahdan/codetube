import {
  Box,
  ContentContainer,
  FocusTrap,
  TextButton,
} from '@codecademy/gamut';
import { SearchIcon, SupportIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import cx from 'classnames';
import { camelCase } from 'lodash';
import React, { Component } from 'react';

// import { trackUserClick } from '~/libs/eventTracking';
import { helpPath, searchPath } from 'libs/urlHelpers';

import styles from './styles.module.scss';

export type SearchProps = {
  isLoggedIn?: boolean;
  location: any;
  toggleSearch: () => void;
};

export type SearchState = {
  value: string;
};

const trackingContext = 'searchbar';
const searchTerms = [
  'Data Science',
  'Python',
  'Web Development',
  'HTML',
  'Java',
];

export class Search extends Component<SearchProps, SearchState> {
  state: SearchState = { value: '' };

  componentDidMount() {
    this.inputRef.current!.focus();
  }

  handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (this.searchElementRef.current!.contains(target)) {
      return;
    }

    if (target.closest('header')) {
      return;
    }

    this.props.toggleSearch();
  };

  navigateToSearch = (searchTerm: string) => {
    window.location.assign(searchPath(searchTerm));

    this.props.toggleSearch();
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    this.navigateToSearch(this.state.value);
  };

  searchElementRef = React.createRef<HTMLDivElement>();

  inputRef = React.createRef<HTMLInputElement>();

  render() {
    return (
      <>
        <Box
          onClick={this.props.toggleSearch}
          aria-hidden
          position="fixed"
          height={`calc(100% - ${theme.elements.headerHeight})`}
          top={theme.elements.headerHeight}
          width={1}
          bg="black"
          opacity={0.2}
        />
        <FocusTrap
          onClickOutside={this.handleOutsideClick}
          onEscapeKey={this.props.toggleSearch}
          allowPageInteraction
        >
          <div
            className={styles.container}
            ref={this.searchElementRef}
            data-testid="header-search-dropdown"
          >
            <div className={styles.innerContainer}>
              <ContentContainer
                className={cx(styles.displayHorizontal, styles.queryContainer)}
              >
                <div className={styles.formContainer}>
                  <SearchIcon
                    className={styles.searchIcon}
                    height={24}
                    width={24}
                  />
                  <form
                    className={styles.search}
                    id="search-form"
                    action="/search"
                    onSubmit={this.handleSubmit}
                  >
                    <input
                      name="query"
                      type="search"
                      id="header-search-bar"
                      placeholder="Search our catalog"
                      className={styles.input}
                      value={this.state.value}
                      onChange={this.handleChange}
                      onKeyDown={(event) => event.stopPropagation()}
                      ref={this.inputRef}
                    />
                  </form>
                </div>
              </ContentContainer>
            </div>
            
          </div>
        </FocusTrap>
      </>
    );
  }
}
