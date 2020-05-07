import React from 'react';
import categories from '../data/categories'

const CategoryList = ({ selectedCategory = '', onClickCategory }) => {
  const buttons = ['All', ...categories].map(item => {
    const classNames = ['category-button'];

    if (item === selectedCategory) {
      classNames.push('active');
    }

    return (
      <button
        key={item}
        type="button"
        className={classNames.join(' ')}
        onClick={() => onClickCategory(item)}
      >
        {item}
      </button>
    )
  });

  return (
    <div style={{ display: 'flex', overflowX: 'auto', marginBottom: 12 }}>
      { buttons }
    </div>
  );
}

export default CategoryList
