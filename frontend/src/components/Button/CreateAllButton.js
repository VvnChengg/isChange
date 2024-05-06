import React, { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { MdArticle, MdTravelExplore, MdOutlineCurrencyExchange } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './CreateAllButton.css'

const CreateAllButton = () => {
  const navigate = useNavigate();
  const [showSubButtons, setShowSubButtons] = useState(false);

  const toggleSubButtons = () => {
    setShowSubButtons(!showSubButtons);
  };


  return (
    <div className="circle-button-container">
      <button  style={{backgroundColor:'transparent', borderColor:'transparent'}} onClick={toggleSubButtons}>
        <FaPlusCircle className="main-button"  /> 
      </button>
      {showSubButtons && (
        <div className="sub-buttons">
          <button className="sub-button" onClick={() => navigate('/post/create')} >
            <MdArticle className="sub-icon" />  <FormattedMessage id='tag.post' />
          </button>
          <button className="sub-button" onClick={() => navigate('/tour/create')}>
            <MdTravelExplore className="sub-icon" />  <FormattedMessage id='tag.tour' />
          </button>
          <button className="sub-button" onClick={() => navigate('/trans/create')}>
            <MdOutlineCurrencyExchange className="sub-icon" />  <FormattedMessage id='tag.trans' />
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateAllButton;
