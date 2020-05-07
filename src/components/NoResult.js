import React from 'react';

const NoResult = ({ text = "No Results found" }) => {
  return (
    <div className="card" style={{
      background: "#fff",
      margin: '16px auto',
    }}>
      <div className="card-body" style={{ textAlign: "left" }}>
        <span style={{ fontSize: 16 }}>{ text }</span>
      </div>
    </div>
  )
}

export default NoResult
