import React from 'react';
import { useState } from 'react';
import { AiOutlineMail } from "https://esm.sh/react-icons/ai";

// 純按鈕
const StartPrivateButton = ({ onClick }) => {
    const handleMouseEnter = () => {
      document.body.style.cursor = 'pointer'; 
    };
    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto'; 
    };
  
    return (
      <div onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <AiOutlineMail size={96} />
      </div>
    );
  };

export default StartPrivateButton;