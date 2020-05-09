import React from 'react';
import './TranslationCard.css';

const TranslationCard = ({ id, textLanguageFrom, textLanguageTo, toggleBookmarkItem, isBookmarked = false }) => {
  return (
    <div className="card">
      <div className="card-body" style={{ textAlign: "left", cursor: 'pointer' }} onClick={() => toggleBookmarkItem(id)}>
        <i
          className={isBookmarked ? "fa fa-star" : "fa fa-star-o"}
          style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', color: isBookmarked ? '#b1bb23' : '#aaa' }}
        ></i>

        <p className="card-text" style={{
          color: "#8C8C8C",
          fontFamily: "Bebas Neue",
          height: 29,
          fontStyle: "bold",
          fontSize: 18,
        }}>
          <b>{id}</b>
        </p>
        <p className="card-text" style={{ color: "gray", fontSize: 14 }}>{textLanguageFrom}</p>
        <p className="card-title" style={{ fontSize: 16 }}>{textLanguageTo}</p>
      </div>
    </div>
  )
}

export default TranslationCard
