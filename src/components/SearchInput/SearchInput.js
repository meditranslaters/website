import React from 'react';
import './SearchInput.css';

const SearchInput = ({ searchInput, setSearchInput, id }) => {
  return (
    <div className="input-group" style={{ margin: '16px 0' }}>
      <input
        type="search"
        className="form-control input-search"
        placeholder="Search"
        aria-label="Search"
        aria-describedby={id}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        x-webkit-speech={"true"}
        style={{
          borderWidth: 3,
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
          borderColor: '#A3A3A3',
        }}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary button-search"
          type="button"
          id={id}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 10,
            paddingRight: 10,
            borderWidth: 3,
            borderLeftWidth: 0,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            borderColor: '#A3A3A3',
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  )
}

export default SearchInput
