import React from 'react';
import TabButton from './TabButton'

const TabButtonList = ({ activeTabNumber, onTabButtonClick }) => {
  return (
    <div className="container-fluid">
      <div className="row tab-button-list" style={{
        backgroundColor: '#313131',
        padding: '6px 0',
      }}>
        <TabButton
          isActive={activeTabNumber === 1}
          onClick={() => onTabButtonClick(1)}
          label={"MASTER LIST"}
        />
        <TabButton
          isActive={activeTabNumber === 2}
          onClick={() => onTabButtonClick(2)}
          label={"FAQ"}
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
