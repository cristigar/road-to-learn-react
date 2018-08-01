import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';
import Button from './Button/Button';
import axios from 'axios';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null
    };
  }

  onDismiss = objectID => {
    const isNotId = item => item.objectID !== objectID;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  onSearchSubmit = event => {
    event.preventDefault();

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  };

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});

    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  render() {
    const { searchTerm, searchKey, results, error } = this.state;
    const page = (results && results[searchKey] && results.page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong!</p>
          </div>
        ) : (
          results &&
          results[searchKey] && (
            <React.Fragment>
              <Table list={list} onDismiss={this.onDismiss} />
              <div className="interactions">
                <Button
                  onClick={() =>
                    this.fetchSearchTopStories(searchKey, page + 1)
                  }
                >
                  More
                </Button>
              </div>
            </React.Fragment>
          )
        )}
      </div>
    );
  }
}

export default App;

export {
  Button,
  Search,
  Table,
};
