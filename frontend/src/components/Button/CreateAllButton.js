import React, { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { MdArticle, MdTravelExplore, MdOutlineCurrencyExchange } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './CreateAllButton.css'
import { Menu } from 'antd';

const CreateAllButton =  ({openMenu, toggleMenu} ) => {
  const navigate = useNavigate();
  const [showSubButtons, setShowSubButtons] = useState(false);


  const toggleSubButtons = () => {
    toggleMenu('createAll');
  };

  return (
  <div className="circle-button-container">
    {openMenu === 'createAll' && (
      <Menu className="sub-buttons">
        <Menu.Item key="1" onClick={() => navigate('/post/create')}>
          <div className="centered-content">
            {/* <MdArticle className="sub-icon" />   */}
            <FormattedMessage id='tag.post' />
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => navigate('/tour/create')}>
          <div className="centered-content">
            {/* <MdTravelExplore className="sub-icon" />   */}
            <FormattedMessage id='tag.tour' />
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={() => navigate('/trans/create')}>
          <div className="centered-content">
            {/* <MdOutlineCurrencyExchange className="sub-icon" />   */}
            <FormattedMessage id='tag.trans' />
          </div>
        </Menu.Item>
      </Menu>
    )}

    <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={toggleSubButtons}>
      <FaPlusCircle className="main-button" />
    </button>
  </div>
  );
};

export default CreateAllButton;