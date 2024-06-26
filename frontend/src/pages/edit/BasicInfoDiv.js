import React, { Fragment, useState, useEffect } from 'react';
import { registerApi } from '../../api/registerApi';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

// 編輯基本資料的元件
export const BasicInfoEdit = ({ showBasicInfo, handleClose, isFocused, handleInputFocus, handleInputBlur, username, school }) => {
    const [userName, setUserName] = useState('');
    const [userNameRegistered, setUserNameRegistered] = useState(false);
    const [userSchoolName, setUserSchoolName] = useState('');
    const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);

    useEffect(() => {
        setUserName(username);
    }, [username]);

    useEffect(() => {
        setUserSchoolName(school);
    }, [school]);

    // 檢查使用者名稱是否已被註冊
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }


    useEffect(() => {
        if (debounceTimeoutId) {
            clearTimeout(debounceTimeoutId);
        }
    
        if (username) {
            const id = setTimeout(CheckUserName, 500); // Wait for 500ms before calling CheckUserName
            setDebounceTimeoutId(id);
        }
    }, [userName]);


    // 檢查使用者名稱是否已被註冊
    const checkUserNameInDatabase = async () => {
        // true => ok
        // false => 已被註冊
        try {
            const email = localStorage.getItem('email');
            const data = await registerApi.verifyUsername(userName, email);
            // console.log(data);

            if (data.status === 'success') {
                setUserNameRegistered(false);
                return false;
            } else {
                setUserNameRegistered(true);
                return true;
            }        
        } catch(error) {
            if (error.response) {
                // console.log(error.response.data);
                // error.response.data 將會是你的錯誤訊息物件，例如：
                // { status: 'failed', message: '使用者名稱已有人使用，請更換其他名稱' }
                if (error.response.data.status === 'failed') {
                    setUserNameRegistered(true);
                } else {
                    setUserNameRegistered(false);
                }
            } else if (error.request) {
                // console.error('No response was received', error.request);
            } else {
                // console.error('Error setting up the request', error.message);
            }
            // console.error('Error config:', error.config);
        };
    }

    const CheckUserName = async () => {
        await checkUserNameInDatabase(username);
    }

    const handleUserSchoolNameChange = (e) => {
        setUserSchoolName(e.target.value);
    }

    // 儲存基本資料
    const handleSubmitBasicInfo = async (e) => {
        e.preventDefault();
        // console.log('表單已提交:', { userName, userSchoolName });

        try{
            const token = localStorage.getItem('access_token');
            const data = await editApi.editBasicInfo(userName, userSchoolName, token);
            if(data.status === 'success'){
                toast.success('更新成功');
                handleClose();
            }
        }catch(error){
            // console.error(error);
            toast.error('更新失敗');
        }
    }

    return (
        <Fragment>
            {showBasicInfo && (
                <div className={editStyles.floatingDiv}>
                    <button onClick={handleClose} className={editStyles.closeButton}>X</button>
                    <form className={editStyles.registerForm}>
                        <label htmlFor='username' className={editStyles.loginForm__label}>
                            <FormattedMessage id='edit.username' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseEnterUserName'>
                                    {(text) =><input
                                        type='text'
                                        id='username'
                                        value={userName}
                                        onChange={handleUserNameChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        className={editStyles.editForm__input}
                                        placeholder={text}
                                        required
                                    />}
                                </FormattedMessage>
                                {userNameRegistered && userName !== username && <span className={editStyles.registeredText}>
                                    <FormattedMessage id='edit.usernameRegistered' />
                                    </span>}
                            </div>
                        </div>

                        <label htmlFor='userSchoolName' className={editStyles.loginForm__label}>
                            <FormattedMessage id='edit.schoolName' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseEnterSchoolName'>
                                    {(text) => <input
                                    type='text'
                                    id='userSchoolName'
                                    value={userSchoolName}
                                    onChange={handleUserSchoolNameChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className={editStyles.editForm__input}
                                    placeholder={text}
                                    required/>}
                                </FormattedMessage>
                            </div>
                        </div>
                        {/* <button type='submit' className={editStyles.actionButton} disabled={userName === username && userSchoolName === school}>
                            確認
                        </button> */}
                        <FormattedMessage id='edit.confirm'>
                        {(text) => <Button
                            style={{
                                width: '100%',
                                backgroundColor: (userName === username && userSchoolName === school) ? '#ccc' : '',
                                color: (userName === username && userSchoolName === school) ? '#888' : '',
                                cursor: (userName === username && userSchoolName === school) ? 'not-allowed' : 'default',
                            }}
                            onClick={(userName === username && userSchoolName === school) ? undefined : handleSubmitBasicInfo}
                            text={text}/>}
                        </FormattedMessage>

                    </form>
                </div>
            )}
        </Fragment>
    );
}