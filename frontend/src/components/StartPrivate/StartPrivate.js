import React from 'react';
import { useState } from 'react';
import { AiOutlineMail } from "https://esm.sh/react-icons/ai";
import './StartPrivate.css';


const Button = ({ onClick }) => {
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

// 抓到的 username 為 receiver
const receiver = "example2";
// 抓到的 chatid
const chatId = "";

//控制彈出式視窗的開關
const Popup = ({ isOpen, onClose }) => {
  // 設定 checkbox 的狀態
  const [isChecked, setIsChecked] = useState(false);

  // 點擊以調整 isChecked 的值
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // 若有打勾則可按按鈕
  const handleButtonClick = (action) => {
    if (isChecked) {
      if (action === 'confirm') {
        // 建立對話
        // 進入該 chat
      } else if (action === 'reject') {
        // do nothing
      }
      onClose();
    } 
  };

  return (
    isOpen && (
      <div className="popup">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-content">
          <h2>開啟私訊</h2>
          <p>
            您將發出 {receiver} 的私訊邀請。若對方也同意即會開始進行私訊，私訊過程中請確認自身個資安全及相關法規限制。並請依循下列規則：
            <br/><br/>
            &lt;使用規則&gt;
            <ol>
              <li> 私訊內容屬於用戶個人行爲，官方不會干預私訊的對話內容，若不慎透露個資而導致個資外洩等情事，官方並不負任何責任。</li>
              <li> 嚴格禁止下列（但不限於）違法行為，對方若有違反可向官方檢舉，官方將協助後續的法律途徑。
              <ul>
                <li>傳遞任何形式的色情或騷擾言論。</li>
                <li>傳遞涉及暴力或威脅恐嚇的言論。</li>
                <li>進行網路詐騙。</li>
              </ul>
              </li>
            </ol>
          </p>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            我了解使用規範及可能的風險
          </label>
          <div className="button-container">
            <div className="buttons">
              <button className="button" onClick={() => handleButtonClick('confirm')} disabled={!isChecked} >確認</button>
              <div className="spacer"></div>
              <button className="button" onClick={() => handleButtonClick('reject')} disabled={!isChecked} >拒絕 </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const StartPrivate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    if (chatId === "") { // 檢查是否為空
      setIsOpen(!isOpen);
    } else {
      // 開啟該聊天室
    }
  };

  return (
    <div>
      <Button onClick={togglePopup} />
      <Popup isOpen={isOpen} onClose={togglePopup} />
    </div>
  );
};

export default StartPrivate;