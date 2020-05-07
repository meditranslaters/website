import React from 'react';

const LanguageSelect = ({ id, name, onChange, value, options }) => {
  return (
    <select
      id={id}
      name={name}
      onChange={(e) => onChange(e)}
      value={value}
      style={{
        color: "black",
        background: "white",
        border: "2px solid black",
        width: "43%"
      }}
      className="dropdown_language_selection">
      { options.map(item => <option key={item.code} value={item.code}>{item.displayName}</option>) }
    </select>
  )
}

export default LanguageSelect
