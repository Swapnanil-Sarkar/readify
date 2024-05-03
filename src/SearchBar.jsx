/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const handleSearch = event => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange={handleSearch} />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
