// Popup.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createChat } from '../../api/createChatApi';
import './StartPrivate.css';
import { FormattedMessage } from 'react-intl';



const Popup = ({ isOpen, onClose, other_id, other_name, direction }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const token = window.localStorage.getItem('access_token');
  const userId = window.localStorage.getItem('user_id');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = async (action) => {
    if (isChecked) {
      if (action === 'confirm') {
        try {
          const newChatId = await createChat(userId, token);
          navigate("/chatroom/" + newChatId);
        } catch (error) {
          console.error('Error creating chat:', error);
        }
      }
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="startprivate-popup">
        <button className="startprivate-close-button" onClick={onClose}>X</button>
        <div className="startprivate-popup-content">
          <h2> 
            <FormattedMessage id={direction === 'Invite' ? 'msgPopUp.titleforStart' : 'msgPopUp.titleforAccept'}/> 
          </h2>
          <p>
            <FormattedMessage
              id={direction === 'Invite' ? 'msg.sendPrivateInvite' : 'msg.acceptPrivateInvite'}
              values={{ other_name: other_name }}
            />
          </p>
          <p> <FormattedMessage id="msg.usageRules" /> </p>
          <ol>
            <li> <FormattedMessage id="msg.disclaimerClause" /> </li>
            <li>
              <FormattedMessage id="msg.strictProhibition" />
              <ul>
                <li><FormattedMessage id="msg.prohibitedList.pornography" /></li>
                <li><FormattedMessage id="msg.prohibitedList.violence" /></li>
                <li><FormattedMessage id="msg.prohibitedList.scam" /></li>
              </ul>
            </li>
          </ol>
          <label className="startprivate-label">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <FormattedMessage id="msg.agreementLabel" />
          </label>
          <div className="startprivate-button-container">
            <div className="startprivate-buttons">
              <button className="button" onClick={() => handleButtonClick('confirm')} disabled={!isChecked} >
              <FormattedMessage id="msg.confirmButton" />
              </button>
              <div className="startprivate-spacer"></div>
              <button className="button" onClick={() => handleButtonClick('reject')} disabled={!isChecked} >
              <FormattedMessage id="msg.rejectButton" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
