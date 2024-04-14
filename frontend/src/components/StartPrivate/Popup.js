import React from 'react';
import { useState } from 'react';
import './StartPrivate.css';
import { useNavigate } from "react-router-dom";



const Popup = ({ isOpen, onClose, receiver, receiver_name  }) => {
    const navigate = useNavigate();
    // 設定 checkbox 的狀態
    const [isChecked, setIsChecked] = useState(false);
  
    // 點擊以調整 isChecked 的值
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    // 若有打勾則可按按鈕
    const handleButtonClick = async (action) => {
      const hostname = 'http://localhost:3000/api';
      //const hostname = process.env.REACT_APP_API_HOSTNAME;
      if (isChecked) {
        if (action === 'confirm') {
          const requestBody = {
            user_id: window.localStorage.getItem('user_id'),
            receiver_id: receiver
          };
          try {
            console.log(requestBody)
            const response = await fetch(`${hostname}/chat/create`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
              throw new Error('Failed to create chat');
            }
    
            // 後續
            const responseData = await response.json();
            const newChatId = responseData.new_chat_id;
            navigate("/chatroom/"+newChatId);

    
          } catch (error) {
            console.error('Error creating chat:', error);}
        } else if (action === 'reject') {
          // do nothing
        }
        onClose();
      } 
    };
  
    return (
      isOpen && (
        <div className="startprivate-popup">
          <button className="startprivate-close-button" onClick={onClose}>X</button>
          <div className="startprivate-popup-content">
            <h2>開啟私訊</h2>
            <p>
              您將發出 {receiver_name} 的私訊邀請。若對方也同意即會開始進行私訊，私訊過程中請確認自身個資安全及相關法規限制。並請依循下列規則：
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
            <label className = 'startprivate-label'>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              我了解使用規範及可能的風險
            </label>
            <div className="startprivate-button-container">
              <div className="startprivate-buttons">
                <button className="button" onClick={() => handleButtonClick('confirm')} disabled={!isChecked} >確認</button>
                <div className="startprivate-spacer"></div>
                <button className="button" onClick={() => handleButtonClick('reject')} disabled={!isChecked} >拒絕 </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  

export default Popup;