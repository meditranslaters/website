import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg"
         style={{ background: "#C1DBBC", color: "black", width: "100%" }}>
      <a className="navbar-brand" href="/">
        <span style={{
          fontFamily: "Bebas Neue",
          color: "black",
          fontSize: "1.3em",
          fontStyle: "regular"
        }}>MediTranslate</span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link disabled" href="/">
              <span style={{ fontFamily: "Roboto", color: "black" }}>COVID-19 Phrasebook</span>
            </a>
          </li>
        </ul>
          <a className="nav-link" href="mailto:hello@meditranslate.co">
            <span style={{ fontFamily: "Roboto", color: "black" }}>Contact Us</span>
          </a>
      </div>
    </nav>
  )
}

export default Header
