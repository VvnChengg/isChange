// ThreeDotButtonPopup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ThreeDotButtonPopup.css';
import '../StartPrivate/StartPrivate.css';
import { FaEdit, FaTrash } from 'react-icons/fa';




const ThreeDotButtonPopup = ({ isOpen, onClose, onEdit, onDelete, buttonPosition }) => {
  
  return (
    isOpen && (
      <div className='three-dot-popup' style={{ position: 'fixed',  top: buttonPosition.top, left: buttonPosition.left }}>
        <button className='startprivate-close-button' onClick={onClose}>X</button>
        <ul>
          <li>
            <button onClick={onEdit}><FaEdit /> <FormattedMessage id='selfpost.edit' /></button>
          </li>
          <li>
            <button onClick={onDelete}><FaTrash /> <FormattedMessage id='selfpost.delete' /></button>
          </li>
        </ul>
      </div>
    )
  );
};

export default ThreeDotButtonPopup;
