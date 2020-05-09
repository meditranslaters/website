import React from 'react';
import CategoryList from './CategoryList'
import NoResult from './NoResult'
import TranslationCard from './TranslationCard'

const MasterListTab = ({ searchInput, setSearchInput, selectedCategory, setSelectedCategory, filteredLanguageData = [], showBookmarkList, toggleShowBookmarkList, toggleBookmarkItem, hasBookmarkList }) => {
  // prepare the content for the translations
  const renderCards = () => {
    if (!filteredLanguageData.length) {
      if (!hasBookmarkList && showBookmarkList) {
        return <NoResult text="You have not bookmarked anything yet! Start bookmark frequently-used phrases by clicking on the star icon and you will be able to access your bookmarked list here :)" />
      }

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
          <div className="input-group" style={{ margin: '16px 0' }}>
            <input
              type="search"
              className="form-control input-search"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-search"
              onChange={(e) => setSearchInput(e.target.value)}
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
                id="button-search"
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

        <div className="col translation-cards" style={{
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
