import React from 'react';

const NoResult = () => {
  return (
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
  )
}

export default NoResult
