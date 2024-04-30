// ChatRoomInput.js

import React, { useState } from 'react';
import './ChatRoom.css';
import { Button, Input, Space } from 'antd';
import { CameraOutlined ,SendOutlined} from '@ant-design/icons';
// import { FormattedMessage } from 'react-intl';

export default function ChatRoomInput({ handleInputChange, inputValue, handleSubmit, handleKeyDown}) {
  const [inputRows, setInputRows] = useState(0);
  const handleResize = () => {
    setInputRows(0)
  };
  
  return (
      <div className='private-message-input-box'>
        <Space.Compact className='private-message-input'>
          <Button type="primary" icon={<CameraOutlined />}  style={{ width: '10%' , borderRadius:0}}></Button>
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
