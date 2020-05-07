import React from 'react';

const TabButton = ({ isActive, label, onClick, width = "35%" }) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={onClick}
      style={{
        borderRight: "3px solid #373533",
        padding: "1vh",
        cursor: "pointer",
        color: "white",
        width,
        background: isActive ? "#4B6261" : "#5B6268"
      }}
    >
      { label }
    </button>
  )
}

export default TabButton
