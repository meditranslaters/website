import React from 'react';
import LanguageSelect from './LanguageSelect'
import supportedLanguages from '../data/supportedLanguages'

const Banner = ({ languageFrom, languageTo, setLanguageFrom, setLanguageTo }) => {
  const onChangeLanguageFrom = (e) => {
    setLanguageFrom(e.target.value);
  }

  const onChangeLanguageTo = (e) => {
    setLanguageTo(e.target.value);
  }

  return (
    <div
      id="banner"
      style={{
        width: '100%',
        paddingBottom: 16,
      }}
      className="container-fluid"
    >
      <div className="row justify-content-center">
        <div
          className="col-md-5"
          style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "Roboto",
            marginTop: 12,
            marginBottom: 12,
          }}>
          A Free Resource for Front-Line Health Workers and Patients to communicate with one
          another, regardless of languages spoken
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6" style={{
          color: "#1A1A1A",
          fontSize: "12",
          marginLeft: "3vh",
          marginRight: "3vh"
        }}>
          <LanguageSelect
            id={"select-language-from"}
            name={"select-language-from"}
            onChange={onChangeLanguageFrom}
            value={languageFrom}
            options={supportedLanguages}
          />

          <span style={{
            marginLeft: 10,
            marginRight: 10,
            fontSize: 14,
            color: "#fff",
          }}>TO</span>

          <LanguageSelect
            id={"select-language-to"}
            name={"select-language-to"}
            onChange={onChangeLanguageTo}
            value={languageTo}
            options={supportedLanguages}
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
