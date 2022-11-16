import fetch from 'isomorphic-fetch';
import React, { useCallback, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
// import { render } from 'react-dom';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';

const CACHE = {};
const PER_PAGE = 50;
const SEARCH_URI = 'https://api.github.com/search/users';

function makeAndHandleRequest(query, page = 1) {
  return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
    .then((resp) => resp.json())
    .then(({ items, total_count }) => {
      const options = items.map((i) => ({
        avatar_url: i.avatar_url,
        id: i.id,
        login: i.login,
      }));
      return { options, total_count };
    });
}

function AsyncPaginationExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');

  const handleInputChange = (q) => {
    setQuery(q);
    console.log("q: ", q)
    console.log("query: ", query)
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    console.log("****** CACHE 1 : ", CACHE)
    console.log("****** options : ", options)
    if (CACHE[q]) {
        //when remove characters by backspace
        console.log("===========================");
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };
      console.log("11111111111111111111 handle request CACHE: ", CACHE)
      console.log("response: ", resp)
      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);

  return (
    <AsyncTypeahead
      id="async-pagination-example"
      isLoading={isLoading}
      labelKey="login"
      maxResults={PER_PAGE - 1}
      minLength={2}
      onInputChange={handleInputChange}
      onSearch={handleSearch}
      options={options}
      paginate
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option) => (
        <div key={option.id}>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.login}</span>
        </div>
      )}
      useCache={false}
    />
  );
}

export default AsyncPaginationExample;