import React from 'react';
import TabButton from './TabButton'

const TabButtonList = ({ activeTabNumber, onTabButtonClick }) => {
  return (
    <div className="container-fluid" style={{ boxShadow: "0px 3px lightgray" }}>
      <div className="row">
        <TabButton
          isActive={activeTabNumber === 1}
          onClick={() => onTabButtonClick(1)}
          label={"MASTER LIST"}
        />
        <TabButton
          isActive={activeTabNumber === 2}
          onClick={() => onTabButtonClick(2)}
          label={"FAQ"}
          width={"30%"}
        />
        <TabButton
          isActive={activeTabNumber === 3}
          onClick={() => onTabButtonClick(3)}
          label={"DOWNLOAD"}
        />
      </div>
    </div>
  )
}

export default TabButtonList
