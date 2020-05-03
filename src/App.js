//react
import React, { useState } from 'react';

//import css
import './Roboto-Black.ttf'
import './App.css';

//import components
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'
import DownloadTab from './components/DownloadTab'
import FaqTab from './components/FaqTab'
import Footer from './components/Footer'
import LanguageSelect from './components/LanguageSelect'
import Header from './components/Header'
import TabButtonList from './components/TabButtonList'

//import methods from readSheet.js
import {
  getLanguageData,
} from './Methods/readSheet'

const { a_language, a_languagedata, b_language, b_languagedata, categories } = getLanguageData("English", "Bengali / বাংলা");
const final_categories = Array.from(new Set(categories))

const App = () => {
  // pageNumber: 1 means the default will be master list
  // pageNumber: 2 means faq page will be selected
  // pageNumber: 3 means download
  const [pageNumber, setPageNumber] = useState(1);
  // aLanguage is the language selected in the first dropdown. Defaults to English
  const [aLanguage, setALanguage] = useState(a_language);
  // aLanguageData stores the translations for the language selected in the first dropdown
  const [aLanguageData, setALanguageData] = useState(a_languagedata);
  // bLanguage is the language selected in the second dropdown. Defaults to Bengali
  const [bLanguage, setBLanguage] = useState(b_language);
  // aLanguageData stores the translations for the language selected in the second dropdown
  const [bLanguageData, setBLanguageData] = useState(b_languagedata);
  // searchInput stores the text user input for search
  const [searchInput, setSearchInput] = useState("");
  // selectedCategory is the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  //prepare the content for the translations
  const renderCards = () => {
    let cards;

    if (aLanguageData.length && bLanguageData.length && aLanguageData.length === bLanguageData.length) {
      //loop through the language data
      const loweredCaseSearchInput = searchInput.toLowerCase();
      cards = aLanguageData
        .filter((item, idx) => {
          // filter out the input based on the search
          const matchSearchInput = searchInput === item.number
            || item[0].toLowerCase().indexOf(loweredCaseSearchInput) > -1
            || bLanguageData[idx][0].toLowerCase().indexOf(loweredCaseSearchInput) > -1;

          const itemInSelectedCategory = selectedCategory === item[1] || selectedCategory === "All";

          return matchSearchInput && itemInSelectedCategory;
        })
        .map((item, idx) => (
            <div key={item.number} className="card" style={{
              width: 228,
              background: "#fff",
              marginTop: "1em",
              marginLeft: "1vh"
            }}>
              <div className="card-body" style={{ textAlign: "left" }}>
                <p className="card-text" style={{
                  color: "#8C8C8C",
                  fontFamily: "Bebas Neue",
                  height: 29,
                  fontStyle: "bold",
                  fontSize: 18,
                }}><b>{item.number}</b></p>
                <p className="card-text" style={{ color: "gray", fontSize: 14 }}>{item[0]}</p>
                <p className="card-title" style={{ fontSize: 16 }}>{bLanguageData[idx][0]}</p>
              </div>
            </div>
          )
        )
    }

    // Display no result if applicable
    if (searchInput !== "" && (!cards || !cards.length)) {
      return (
        <div className="card" style={{
          width: 228,
          height: 100,
          background: "#fff",
          marginTop: "1em",
          marginLeft: "1vh"
        }}>
          <div className="card-body" style={{ textAlign: "left" }}>
            <span style={{ fontSize: 16 }}>No Results Found</span>
          </div>
        </div>
      )
    }

    return cards;
  }

  const renderTabContent = () => {
    if (pageNumber === 1) {
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
                x-webkit-speech
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
                  <td align="left">
                    <CategoryList
                      categories={final_categories}
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
        aLanguage={aLanguage}
        bLanguage={bLanguage}
        setALanguage={setALanguage}
        setALanguageData={setALanguageData}
        setBLanguage={setBLanguage}
        setBLanguageData={setBLanguageData}
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
