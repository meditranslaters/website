import React from 'react';

const CategoryList = ({ categories = [], selectedCategory = '', onClickCategory }) => {
  return categories.map(item => {
    const backgroundColor = item === selectedCategory ? "#4B6261" : "lightgray";
    const color = item === selectedCategory ? "#fff" : "#373737";

    return (
      <div key={item}>
        <button
          type="button"
          className="btn"
          onClick={() => onClickCategory(item)}
          style={{
            fontWeight: 3,
            padding: "0.3vh",
            marginLeft: "-1.5vh",
            fontFamily: "Bebas Neue",
            backgroundColor,
            color,
            width: "126px",
            height: "53px",
            borderTopLeftRadius: "0em",
            marginTop: "1vh",
            fontSize: "1.1em",
            borderBottomLeftRadius: "0em",
            borderTopRightRadius: "1em",
            borderBottomRightRadius: "1em",
            textAlign: 'left'
          }}>{item}</button>
      </div>
    )
  });
}

export default CategoryList
