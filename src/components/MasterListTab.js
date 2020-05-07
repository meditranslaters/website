import React from 'react';
import CategoryList from './CategoryList'
import NoResult from './NoResult'
import TranslationCard from './TranslationCard'

const MasterListTab = ({ searchInput, setSearchInput, selectedCategory, setSelectedCategory, filteredLanguageData = [], showBookmarkList, toggleShowBookmarkList, toggleBookmarkItem, hasBookmarkList }) => {
  // prepare the content for the translations
  const renderCards = () => {
    if (!searchInput && hasBookmarkList && showBookmarkList && !filteredLanguageData.length) {
      return <NoResult text="You have not bookmarked anything yet! Start bookmark frequently used translation by clicking on the star icon and you will be able to access them here :)" />
    }

    // Display no result if applicable
    if (searchInput !== "" && !filteredLanguageData.length) {
      return <NoResult />
    }

    return filteredLanguageData
      .map(item =>
        <TranslationCard
          key={item.id}
          id={item.id}
          textLanguageFrom={item.from}
          textLanguageTo={item.to}
          toggleBookmarkItem={toggleBookmarkItem}
          isBookmarked={item.isBookmarked}
        />
      )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ display: 'flex' }}>
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
          <div onClick={toggleShowBookmarkList} style={{
            display: 'flex',
            marginLeft: 12,
            alignItems: 'center',
          }}>
            <i
              className={showBookmarkList ? "fa fa-star" : "fa fa-star-o"}
              style={{
                fontSize: 32,
                color: showBookmarkList ? '#b1bb23' : '#aaa',
                cursor: 'pointer',
              }}
            ></i>
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
