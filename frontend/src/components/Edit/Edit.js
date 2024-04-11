import React, { useState } from 'react';
import '../../styles/Edit.css';
import { UserIcon } from './Edit-style';

const Edit = () => {
    const [showPasswordDiv, setShowPasswordDiv] = useState(false);

    const handleClose = () => {
        setShowPasswordDiv(false);
      };
      
    return (
        <div className="edit-container">
            <div className="edit-form">
                <div className="section-1">
                    <div className="section-1-left">
                        <div className="section-heading">頭像編輯</div>
                        <div className="profile-picture">
                            <UserIcon src="profile" />
                        </div>
                        <div className="edit-button">
                            <button>上傳圖片</button>
                        </div>
                    </div>

                    <div className="section-1-right">
                        <div className="section-heading">基本資料修改</div>
                        <div className="action-buttons">
                            <button onClick={() => setShowPasswordDiv(true)}>修改密碼</button>
                            <button>修改名稱學校</button>
                        </div>
                    </div>
                    {showPasswordDiv && (
                        <div className='floating-div'>
                            <button onClick={handleClose} className="close-button">X</button>
                            <input
                                type="email"
                                id="email"
                                // value={email}
                                // onChange={handleEmailChange}
                                // onFocus={handleInputFocus}
                                // onBlur={handleInputBlur}
                                className="login-form__input"
                                placeholder="請輸入電子信箱"
                                required
                            />
                        </div>
                    )}
                </div>
                <div className="section-2">
                    <div className="section-heading">自我介绍</div>
                    <textarea className="self-intro" placeholder="限兩百字以內"></textarea>
                    <button>儲存</button>
                </div>
            </div>
        </div>
    );
}

export default Edit;