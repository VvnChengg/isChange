import React, { Fragment, useState, useEffect } from 'react';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

// 編輯密碼的元件
export const PassWordEdit = ({ showPasswordDiv,
    handleClose, isFocused, handleInputBlur, handleInputFocus }) => {
    const [OriginPassWord, setOriginPassWord] = useState(''); 

    const [passWord, setPassword] = useState('');
    const [passWord_confirm, setPassword_confirm] = useState('');
    const [isPassWordSame, setIsPassWordSame] = useState(true); // 密碼是否相同
    const [passWordRuleMatched, setPassWordRuleMatched] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        CheckpassWordRule();
    }

    const CheckpassWordRule = () => {
        // 之後要補密碼規則
        // 密碼長度至少為 8
        if (passWord.length < 8) {
            setPassWordRuleMatched(false);
            return;
        }
        setPassWordRuleMatched(true);
    }

    const CheckpassWordSame = () => {
        if (passWord === passWord_confirm) {
            setIsPassWordSame(true);
        } else {
            setIsPassWordSame(false);
        }
    }

    useEffect(() => {
        CheckpassWordRule();
        CheckpassWordSame();
    }, [passWord, passWord_confirm]);


    const handlePasswordConfirmChange = (e) => {
        setPassword_confirm(e.target.value);
    }

    const handleOriginPassWordChange = (e) => {
        setOriginPassWord(e.target.value);
    }


    const handleSubmitPassWord = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('access_token');
            const data = await editApi.editPassWord(OriginPassWord, passWord, token);
            if(data.status === 'success'){
                toast.success('更新成功');
                handleClose();
            }
        }catch(error){
            toast.error('更新失敗');
        }

    }

    return (
        <Fragment>
            {showPasswordDiv && (
                <div className={editStyles.floatingDiv}>
                    <button onClick={handleClose} className={editStyles.closeButton}>X</button>
                    <form className={editStyles.editFrom}>
                        <label htmlFor='password-origin-input' className={editStyles.editForm__label}>
                            <FormattedMessage id='edit.inputOriginPassWord' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseInputOriginPassWord'>
                                    {(text) => <input
                                    type='password'
                                    id='password-origin-input'
                                    value={OriginPassWord}
                                    onChange={handleOriginPassWordChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className={editStyles.editForm__input}
                                    placeholder={text}
                                    required/>}
                                </FormattedMessage>
                            </div>
                        </div>

                        <label htmlFor='password-input' className={editStyles.editForm__label}>
                            <FormattedMessage id='edit.newPassword' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseInputNewPassWord'>
                                    {(text) => <input
                                    type='password'
                                    id='password-input'
                                    value={passWord}
                                    onChange={handlePasswordChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className={editStyles.editForm__input}
                                    placeholder={text}
                                    required/>}
                                </FormattedMessage>
                                {!passWordRuleMatched && <span className={editStyles.registeredText}>
                                    <FormattedMessage id='edit.passwordRuleNottMatch' />
                                </span>}
                            </div>
                        </div>
                        <label htmlFor='password-confirm-input' className={editStyles.editForm__label}>
                            <FormattedMessage id='edit.confirmNewPassword' />
                        </label>
                        <div className={editStyles.editForm__inputGroup}>
                            <div className={`${editStyles.editForm__InputContainer} ${isFocused ? 'focused' : ''}`}>
                                <FormattedMessage id='edit.pleaseInputYourConfirmPassword'>
                                    {(text) => <input
                                    type='password'
                                    id='password-confirm-input'
                                    value={passWord_confirm}
                                    onChange={handlePasswordConfirmChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className={editStyles.editForm__input}
                                    placeholder={text}
                                    required/>}
                                </FormattedMessage>
                                {!isPassWordSame && <span className={editStyles.registeredText}>
                                    <FormattedMessage id='edit.passwordNotMatch' />
                                </span>}
                            </div>
                        </div>                        

                        <FormattedMessage id='edit.confirm'>
                        {(text) => <Button
                            style={{
                                width: '100%',
                                backgroundColor: (!isPassWordSame || !passWordRuleMatched) ? '#ccc' : '',
                                color: (!isPassWordSame || !passWordRuleMatched) ? '#888' : '',
                                cursor: (!isPassWordSame || !passWordRuleMatched) ? 'not-allowed' : 'default',
                            }}
                            onClick={(!isPassWordSame || !passWordRuleMatched) ? undefined : handleSubmitPassWord}
                            text={text}/>}
                        </FormattedMessage>
                    </form>
                </div>
            )}
        </Fragment>
    );
}