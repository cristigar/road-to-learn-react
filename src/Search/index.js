import React, { Component } from 'react';

class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      searchTerm,
      onChange,
      children: text,
      onSubmit,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="search"
          onChange={onChange}
          value={searchTerm}
          ref={(node) => { this.input = node; }}
        />
        <button type="submit">{text}</button>
      </form>
    );
  }
}

export default Search;
