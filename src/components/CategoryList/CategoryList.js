import React from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, selectedCategory = '', onClickCategory }) => {
  const buttons = ['All', ...categories].map(item => {
    const classNames = ['category-button'];

    if (item === selectedCategory) {
      classNames.push('active');
    }

    return (
      <div
        key={item}
        className={classNames.join(' ')}
        onClick={() => onClickCategory(item)}
      >
        {item}
      </div>
    )
  });

  return (
    <div style={{ display: 'flex', overflowX: 'auto', marginBottom: 12 }}>
      { buttons }
    </div>
  );
}

export default CategoryList
