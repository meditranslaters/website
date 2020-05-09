import React from 'react';
import './LanguageSelect.css';

const LanguageSelect = ({ id, name, onChange, value, options }) => {
  return (
    <select
      id={id}
      name={name}
      onChange={(e) => onChange(e)}
      value={value}
      className="dropdown-language-selection">
      { options.map(item => <option key={item.code} value={item.code}>{item.displayName}</option>) }
    </select>
  )
}

export default LanguageSelect
