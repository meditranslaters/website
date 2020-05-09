import React from 'react';
import categories from '../../data/categories';
import './CategoryList.css';

const CategoryList = ({ selectedCategory = '', onClickCategory }) => {
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
