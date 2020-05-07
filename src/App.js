//react
import React, { useMemo, useState } from 'react';

//import css
import './Roboto-Black.ttf'
import './App.css';

//import components
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'
import DownloadTab from './components/DownloadTab'
import FaqTab from './components/FaqTab'
import Footer from './components/Footer'
import Header from './components/Header'
import NoResult from './components/NoResult'
import TabButtonList from './components/TabButtonList'
import TranslationCard from './components/TranslationCard'

//import methods from readSheet.js
import {
  getLanguageData,
} from './Methods/readSheet'
import categories from './data/categories'

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
        <span>
          <div className="row no-gutters" style={{ width: "95%", margin: "2vh", }}>
            <div className="col">
              <input
                className="form-control border-secondary"
                style={{
                  borderTopLeftRadius: "100px",
                  borderBottomLeftRadius: "100px",
                  borderRight: "0"
                }}
                type="search"
                placeholder="Search"
                id="input-search"
                onChange={(e) => setSearchInput(e.target.value)}
                x-webkit-speech={"true"}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-outline-secondary"
                style={{
                  borderTopRightRadius: "100px",
                  borderBottomRightRadius: "100px",
                  borderLeft: "0px"
                }}
                type="button">
                <i className="fa fa-search" style={{ color: "lightgray" }}></i>
              </button>
            </div>
           </div>
          <table
            style={{ width: "100%", overflowY: "auto", background: "white" }}
            className="table table-striped">
              <tbody>
                <tr>
                  <td align="left" width={126}>
                    <CategoryList
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onClickCategory={setSelectedCategory}
                    />
                  </td>
                  <td>
                    <div
                      className="row"
                      style={{
                        height: "90vh",
                        width: "95%",
                        overflowY: "auto",
                        background: "white"
                      }}
                      id="translation_cards">
                      {renderCards()}
                    </div>
                  </td>
                </tr>
              </tbody>
           </table>
        </span>
      );
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
