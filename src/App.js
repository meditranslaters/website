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
  getSupportedLanguages,
  getLanguageData,
} from './Methods/readSheet'

const supportedLanguages = getSupportedLanguages();
const { a_language, a_languagedata, b_language, b_languagedata, categories } = getLanguageData("English", "Bengali / বাংলা");
const final_categories = Array.from(new Set(categories))

const App = () => {

    //define react state

    //page_number
    //page_number : 1 means the default will be master list
    //page_number : 2 means faq page will be selected
    //page_number : 3 means download

    //supported_langs state stores all the languages which are shown in the dropdowns

    //search_input stores the user search made through the search widget

    //a_languagedata stores the translations retrieved from the server for the first dropdown

    //b_languagedata stores the translations retrievered from the server for the second dropdown

    //a_language is the language selected from the first dropdown. By default its selected to
    // English

    //b_language is the language selected from the first dropdown. By default its selected to
    // Bengali

    //category_selected is the currently selected category by default is selected to All
    // this.state = {
    //   page_number: 1,
    //   supported_langs: [],
    //   search_input: "",
    //   a_languagedata: [],
    //   b_languagedata: [],
    //   a_language: "English",
    //   b_language: "Bengali / বাংলা",
    //   category_selected: "All",
    // }

  const [pageNumber, setPageNumber] = useState(1);
  const [aLanguage, setALanguage] = useState(a_language);
  const [aLanguageData, setALanguageData] = useState(a_languagedata);
  const [bLanguage, setBLanguage] = useState(b_language);
  const [bLanguageData, setBLanguageData] = useState(b_languagedata);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

    //intialise a state varaible for this class
    // props__export = this;

    //intialise methods that may alter the react states

    //this method pulls out all the supported languages
    // this.getSupportedLanguages = getSupportedLanguages.bind(this)
    //this method is trigged when a category is selected
    // this.onChangeCategory = onChangeCategory.bind(this)
    //this method is triggred when a language from the dropdown is selected
    // this.getLanguageData = getLanguageData.bind(this)
    //this is triggered when a search made through the input
    // this.onChangeSearch = onChangeSearch.bind(this)
    //this is triggered when the menu in the master list, faq and download is clicked
    // this.changeMenu = this.changeMenu.bind(this)

    //Initllay when the site is loaded call the below methods to intialise the supported languages
    // and language data from the react server retreive supported languages
    // this.getSupportedLanguages()
    // this.getLanguageData("English", "Bengali / বাংলা")

  // }


  //method that alters the state of the main menu
  // changeMenu(pagenum) {
  //   this.setState({ page_number: pagenum })
  // }

  //prepare the content for the translations
  let cards_html;

  //check if the data retrieved from the server is not null
  if (aLanguageData.length && bLanguageData.length && aLanguageData.length === bLanguageData.length) {
    //loop through the language data
    const loweredCaseSearchInput = searchInput.toLowerCase();
    cards_html = aLanguageData
      .filter((item, idx) => {
        // filter out the input based on the search
        const matchSearchInput = searchInput === item.number
          || item[0].toLowerCase().indexOf(loweredCaseSearchInput) > -1
          || bLanguageData[idx][0].toLowerCase().indexOf(loweredCaseSearchInput) > -1;

        const itemInSelectedCategory = selectedCategory === item[1] || selectedCategory === "All";

        return matchSearchInput && itemInSelectedCategory;
      })
      .map((item, idx) => (
          <div className="card" style={{
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

  // Display no result if applicable.
  if (searchInput !== "" && (!cards_html || !cards_html.length)) {
    cards_html =
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
  }

  let tabContent = null;
  if (pageNumber === 1) {
    tabContent =
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
                    {cards_html}
                  </div>
                </td>
              </tr>
            </tbody>
         </table>
      </span>
  } else if (pageNumber === 2) {
    tabContent = <FaqTab />
  } else if (pageNumber === 3) {
    tabContent = <DownloadTab />
  }

  const onChangeLanguageFrom = (e) => {
    const { a_language, a_languagedata, b_language, b_languagedata } = getLanguageData(e.target.value, bLanguage);
    setALanguage(a_language);
    setALanguageData(a_languagedata);
    setBLanguage(b_language);
    setBLanguageData(b_languagedata);
  }

  const languageSelectFrom = (
    <LanguageSelect
      id={"select-language-from"}
      name={"select-language-from"}
      onChange={onChangeLanguageFrom}
      value={aLanguage}
      options={supportedLanguages}
    />
  )

  const onChangeLanguageTo = (e) => {
    const { a_language, a_languagedata, b_language, b_languagedata } = getLanguageData(aLanguage, e.target.value);
    setALanguage(a_language);
    setALanguageData(a_languagedata);
    setBLanguage(b_language);
    setBLanguageData(b_languagedata);
  }

  const languageSelectTo = (
    <LanguageSelect
      id={"select-language-to"}
      name={"select-language-to"}
      onChange={onChangeLanguageTo}
      value={bLanguage}
      options={supportedLanguages}
    />
  )

  return (
    <div className="App" style={{ width: "100%" }}>
      <Header />

      <Banner languageSelectFrom={languageSelectFrom} languageSelectTo={languageSelectTo} />

      <TabButtonList
        activeTabNumber={pageNumber}
        onTabButtonClick={setPageNumber}
      />

      {tabContent}

      <Footer />
    </div>
  );
}

export default App;
