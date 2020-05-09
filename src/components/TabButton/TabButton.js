import React from 'react';
import './TabButton.css';

const TabButton = ({ isActive, label, onClick }) => {
  const className = ["tab-button"];

  if (isActive) {
    className.push('active');
  }

  return (
    <div className={className.join(' ')} onClick={onClick}>
      { label }
    </div>
  )
}

export default TabButton
