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

export default MasterListTab;
