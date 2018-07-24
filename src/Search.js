import React from 'react';

const Search = ({
  searchTerm,
  onChange,
  children: text,
  onSubmit,
}) =>
  <form onSubmit={onSubmit}>
    <input
      type="search"
      onChange={onChange}
      value={searchTerm}
    />
    <button type="submit">{text}</button>
  </form>
;

export default Search;
