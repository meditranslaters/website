import React from 'react';
import CategoryList from './CategoryList'
import NoResult from './NoResult'
import TranslationCard from './TranslationCard'

const MasterListTab = ({ searchInput, setSearchInput, selectedCategory, setSelectedCategory, filteredLanguageData = [] }) => {
  // prepare the content for the translations
  const renderCards = () => {
    // Display no result if applicable
    if (searchInput !== "" && !filteredLanguageData.length) {
      return <NoResult />
    }

    return filteredLanguageData
      .map(item =>
        <TranslationCard
          key={item.id}
          number={item.id}
          textLanguageFrom={item.from}
          textLanguageTo={item.to}
        />
      )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="input-group my-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-search"
              id="input-search"
              onChange={(e) => setSearchInput(e.target.value)}
              x-webkit-speech={"true"}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-search"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <CategoryList
          selectedCategory={selectedCategory}
          onClickCategory={setSelectedCategory}
        />

        <div className="col" id="translation-cards" style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {renderCards()}
        </div>
      </div>
    </div>
  );
}

export default MasterListTab;
