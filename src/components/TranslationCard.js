import React from 'react';

const TranslationCard = ({ number, textLanguageFrom, textLanguageTo }) => {
  return (
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
        }}>
          <b>{number}</b>
        </p>
        <p className="card-text" style={{ color: "gray", fontSize: 14 }}>{textLanguageFrom}</p>
        <p className="card-title" style={{ fontSize: 16 }}>{textLanguageTo}</p>
      </div>
    </div>
  )
}

export default TranslationCard
