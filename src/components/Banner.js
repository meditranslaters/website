import React from 'react';
import LanguageSelect from './LanguageSelect'

const Banner = ({ languageSelectFrom, languageSelectTo }) => {
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
          { languageSelectFrom }

          <span style={{
            width: "5%",
            marginLeft: "1vh",
            marginRight: '1vh',
            color: 'white'
          }}>TO</span>

          { languageSelectTo }
        </div>
      </div>
    </div>
  )
}

export default Banner
