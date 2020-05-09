import React from 'react';
import CategoryList from './CategoryList'
import NoResult from './NoResult'
import SearchInput from './SearchInput'
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
          <SearchInput id="search-masterlist" setSearchInput={setSearchInput} />
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
