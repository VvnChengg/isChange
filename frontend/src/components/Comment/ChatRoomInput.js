// ChatRoomInput.js

import React, { useState, useRef } from 'react';
import './ChatRoom.css';
import { Button, Input, Space } from 'antd';
import { CameraOutlined ,SendOutlined} from '@ant-design/icons';
// import { FormattedMessage } from 'react-intl';

export default function ChatRoomInput({ handleInputChange, inputValue, handleSubmit, handleKeyDown, handleFileInputChange}) {
  const [inputRows, setInputRows] = useState(0);
  const handleResize = () => {
    setInputRows(0)
  };

  const fileInputRef2 = useRef(null);

  const handleButtonClick = () => {
    fileInputRef2.current.click();
  };
  
  return (
      <div className='private-message-input-box'>
        <Space.Compact className='private-message-input'>
          <Button
            type="primary"
            icon={<CameraOutlined />}
            style={{ width: '10%', borderRadius: 0 }}
            onClick={handleButtonClick}
          >
          </Button>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            ref={fileInputRef2}
            onChange={handleFileInputChange}
          />
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }} // 自動調整大小，最多變為三行
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={handleKeyDown}
            rows={inputRows}
            onResize={handleResize}
            style={{ width: '100%' , borderRadius:0}}
          />     
          <Button type="primary" icon={<SendOutlined />} style={{ width: '10%' , borderRadius:0}} onClick={handleSubmit}></Button>
        </Space.Compact>
      </div>

  );
}
