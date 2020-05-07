//react
import React, { useMemo, useState } from 'react';

//import css
import './Roboto-Black.ttf'
import './App.css';

//import components
import Banner from './components/Banner'
import DownloadTab from './components/DownloadTab'
import FaqTab from './components/FaqTab'
import Footer from './components/Footer'
import Header from './components/Header'
import MasterListTab from './components/MasterListTab'
import TabButtonList from './components/TabButtonList'

//import methods from readSheet.js
import {
  getLanguageData,
} from './Methods/readSheet'

const initialLanguageCodeFrom = 'en';
const initialLanguageCodeTo = 'bn';

const App = () => {
  // pageNumber: 1 means the default will be master list
  // pageNumber: 2 means faq page will be selected
  // pageNumber: 3 means download
  const [pageNumber, setPageNumber] = useState(1);
  // languageFrom is the language selected in the first dropdown. Defaults to English
  const [languageFrom, setLanguageFrom] = useState(initialLanguageCodeFrom);
  // languageTo is the language selected in the second dropdown. Defaults to Bengali
  const [languageTo, setLanguageTo] = useState(initialLanguageCodeTo);
  // searchInput stores the text user input for search
  const [searchInput, setSearchInput] = useState("");
  // selectedCategory is the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  const languageData = useMemo(() => getLanguageData(languageFrom, languageTo, selectedCategory), [
    languageFrom, languageTo, selectedCategory
  ]) || [];

  const filteredLanguageData = useMemo(() => {
    const lowerCaseSearchInput = searchInput && searchInput.toLowerCase();
    return languageData
      // filter data based on search input
      .filter(item =>
        (searchInput === item.id)
        || (item.from && item.from.toLowerCase().indexOf(lowerCaseSearchInput) > -1)
        || (item.to && item.to.toLowerCase().indexOf(lowerCaseSearchInput) > -1)
      )
  }, [searchInput, languageData])

  const renderTabContent = () => {
    if (pageNumber === 1) {
      return (
        <MasterListTab
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredLanguageData={filteredLanguageData}
        />
      )
    }

    if (pageNumber === 2) {
      return <FaqTab />
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
