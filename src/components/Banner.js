import React from 'react';
import { getLanguageData, getSupportedLanguages } from '../Methods/readSheet'
import LanguageSelect from './LanguageSelect'

const supportedLanguages = getSupportedLanguages();

const Banner = ({ aLanguage, bLanguage, setALanguage, setALanguageData, setBLanguage, setBLanguageData }) => {
  const onChangeLanguageFrom = (e) => {
    const { a_language, a_languagedata, b_language, b_languagedata } = getLanguageData(e.target.value, bLanguage);
    setALanguage(a_language);
    setALanguageData(a_languagedata);
    setBLanguage(b_language);
    setBLanguageData(b_languagedata);
  }

  const onChangeLanguageTo = (e) => {
    const { a_language, a_languagedata, b_language, b_languagedata } = getLanguageData(aLanguage, e.target.value);
    setALanguage(a_language);
    setALanguageData(a_languagedata);
    setBLanguage(b_language);
    setBLanguageData(b_languagedata);
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
            color: "white",
            fontSize: "14",
            fontFamily: "Roboto",
            marginTop: 12,
            marginBottom: 12,
            marginLeft: "3vh",
            marginRight: "3vh"
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
            value={aLanguage}
            options={supportedLanguages}
          />

          <span style={{
            width: "5%",
            marginLeft: "1vh",
            marginRight: '1vh',
            color: 'white'
          }}>TO</span>

          <LanguageSelect
            id={"select-language-to"}
            name={"select-language-to"}
            onChange={onChangeLanguageTo}
            value={bLanguage}
            options={supportedLanguages}
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
