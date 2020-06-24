//react
import React, { useCallback, useEffect, useMemo, useState } from 'react';

//import css
import './App.css';

//import components
import Banner from './components/Banner'
import DownloadTab from './components/DownloadTab'
import FaqTab from './components/FaqTab'
import Footer from './components/Footer'
import Header from './components/Header'
import MasterListTab from './components/MasterListTab'
import TabButtonList from './components/TabButtonList'
import getLanguageData from './utils/getLanguageData'
import useLocalStorage from './utils/useLocalStorage'
import categories from './data/categories'
import getAvailableCategoriesByLanguageTo from './utils/getAvailableCategoriesByLanguageTo'

const initialLanguageCodeFrom = 'en';
const initialLanguageCodeTo = 'bn';

const App = () => {
  // pageNumber: 1 means the default will be master list
  // pageNumber: 2 means faq page will be selected
  // pageNumber: 3 means download
  const [pageNumber, setPageNumber] = useState(1);
  // languageFrom is the language selected in the first dropdown. Defaults to English
  const [languageFrom, setLanguageFrom] = useLocalStorage("languageFrom", initialLanguageCodeFrom);
  // languageTo is the language selected in the second dropdown. Defaults to Bengali
  const [languageTo, setLanguageTo] = useLocalStorage("languageTo", initialLanguageCodeTo);
  // searchInput stores the text user input for search
  const [searchInput, setSearchInput] = useState("");
  // selectedCategory is the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Stores array of ids of the bookmarked translation data.
  const [bookmarkList, setBookmarkList] = useLocalStorage("bookmarkList", []);
  // Track whether to show bookmarked translation data only.
  const [showBookmarkList, setShowBookmarkList] = useState(false);

  const languageData = useMemo(() => getLanguageData(languageFrom, languageTo, selectedCategory, bookmarkList), [
    languageFrom, languageTo, selectedCategory, bookmarkList
  ]) || [];

  const categories = useMemo(() => getAvailableCategoriesByLanguageTo(languageFrom, languageTo), [
    languageFrom, languageTo
  ]);

  const filteredLanguageData = useMemo(() => {
    const lowerCaseSearchInput = searchInput && searchInput.toLowerCase();
    return languageData
      // filter data based on search input
      .filter(item =>
        (showBookmarkList ? item.isBookmarked : true) &&
        ((searchInput === item.id)
        || (item.from && item.from.toLowerCase().indexOf(lowerCaseSearchInput) > -1)
        || (item.to && item.to.toLowerCase().indexOf(lowerCaseSearchInput) > -1))
      )
  }, [searchInput, languageData, showBookmarkList])

  const toggleBookmarkItem = useCallback((id) => {
    if (bookmarkList.includes(id)) {
      setBookmarkList(bookmarkList.filter(a => a !== id));
    }
    else {
      setBookmarkList([...bookmarkList, id]);
    }
  }, [bookmarkList, setBookmarkList]);

  const toggleShowBookmarkList = useCallback(() => {
    setShowBookmarkList(!showBookmarkList);
  }, [showBookmarkList]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  const renderTabContent = () => {
    if (pageNumber === 1) {
      return (
        <MasterListTab
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredLanguageData={filteredLanguageData}
          showBookmarkList={showBookmarkList}
          toggleShowBookmarkList={toggleShowBookmarkList}
          toggleBookmarkItem={toggleBookmarkItem}
          hasBookmarkList={bookmarkList.length}
          categories={categories}
        />
      )
    }

    if (pageNumber === 2) {
      return (
        <FaqTab
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          languageFrom={languageFrom}
          languageTo={languageTo}
        />
      )
    }

    if (pageNumber === 3) {
      return <DownloadTab />
    }

    return null;
  }

  return (
    <div className="App" style={{ width: "100%" }}>
      <Header />

      <Banner
        languageFrom={languageFrom}
        languageTo={languageTo}
        setLanguageFrom={setLanguageFrom}
        setLanguageTo={setLanguageTo}
      />

      <TabButtonList
        activeTabNumber={pageNumber}
        onTabButtonClick={setPageNumber}
      />

      {renderTabContent()}

      <Footer />
    </div>
  );
}

export default App;
