import React from 'react';
import DropdownMenustyles from '../../styles/DropdownMenu.module.css';
import { FormattedMessage } from 'react-intl';

function DropdownMenu({ isOpen, setIsOpen, token, navigate, logout }) {
    const handleClick = (callback) => {
      setIsOpen(false); // 關閉下拉選單
      callback(); // 執行傳入的函數
    };
  
    return (
      <div className={DropdownMenustyles.dropdownMenu}>
        {isOpen && token && (
          <ul>
            <li onClick={() => handleClick(() => navigate('/member'))}>
                <FormattedMessage id='header.member'/>
            </li>
            <li onClick={() => handleClick(logout)}>
                <FormattedMessage id='header.logout'/>
            </li>
          </ul>
        )}
        {isOpen && !token && (
          <ul>
            <li onClick={() => handleClick(() => navigate('/login'))}>
                <FormattedMessage id='header.login'/>
            </li>
          </ul>
        )}
      </div>
    );
  }
export default DropdownMenu;

