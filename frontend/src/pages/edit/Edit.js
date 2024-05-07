
import React, { useState, useEffect, useRef } from 'react';
import editStyles from '../../styles/Edit.module.css';
import { FormattedMessage } from 'react-intl';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


import { PassWordEdit } from './PassWordDiv';
import { BasicInfoEdit } from './BasicInfoDiv';
import { SelfInfo } from './SelfInfo';
import { ImageUploadDiv } from './ImageDiv'
import { StudentVeri } from './StudentVeri';

import { viewApi } from '../../api/viewApi';
import { useToken } from '../../hooks/useToken';
import Button from '../../components/Button';

const Edit = () => {
    const [showPasswordDiv, setShowPasswordDiv] = useState(false);
    const [showBasicInfoDiv, setShowBasicInfoDiv] = useState(false);
    const [showStudentVeri, setShowStudentVeri] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [introText, setIntroText] = useState('');

    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [photo, setPhoto] = useState('');
    const [studentVeriStatus, setStudentVeriStatus] = useState(false);
    const token = useToken();

    const [isLoading, setIsLoading] = useState(true);

    const getInfo = async () => {
        const memberInfo = await viewApi.getMember(token);

        setUsername(memberInfo.username);
        setSchool(memberInfo.exchange_school_name);
        setPhoto(memberInfo.photo);
        setIntroText(memberInfo.intro);
        setStudentVeriStatus(memberInfo.student_verification);
        // console.log('photo:'+memberInfo.photo);
        setIsLoading(false);
    }

    useEffect(() => {
        if(token){
            getInfo();
        }

    }, [token]);

    if (isLoading) {
        return <Spin />;
    }


    // 處理輸入框的焦點
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    // 處理輸入框失去焦點
    const handleInputBlur = () => {
        setIsFocused(false);
    };


    const handleShowBasicInfoDivClose = () => {
        setShowBasicInfoDiv(false);
    }


    const handlePassWordDivClose = () => {
        setShowPasswordDiv(false);
    }

    const handleStudentVeriDivClose = () => {
        setShowStudentVeri(false);
    }


    return (
        <div className={editStyles.editContainer}>
            <div className={editStyles.editForm}>
                <div className={editStyles.section1}>
                    <div className={editStyles.section1Left}>
                        <ImageUploadDiv
                            photo={photo}
                            setPhoto={setPhoto} />
                    </div>

                    <div className={editStyles.section1Right}>
                        <div className={editStyles.sectionHeading}>
                            <FormattedMessage id='edit.changeBasicInfo'/>

                        </div>
                        <div className={editStyles.actionButtonsDiv}>
                            <FormattedMessage id='edit.changePassword'>
                                {(text) => <Button
                                    style={{ marginBottom: '5%' }}
                                    onClick={() => setShowPasswordDiv(true)}
                                    text={text}
                                />}
                            </FormattedMessage>

                            <FormattedMessage id='edit.changeUsernameandSchool'>
                                {(text) => <Button
                                    style={{ marginBottom: '5%' }}
                                    onClick={() => setShowBasicInfoDiv(true)}
                                    text={text}
                                />}
                            </FormattedMessage>

                            <FormattedMessage id={studentVeriStatus? 'edit.studentVerified' : 'edit.studentVeri'}>
                                {(text) => <Button
                                    style={{ marginBottom: '5%',
                                    backgroundColor: studentVeriStatus ? '#ccc' : '',
                                    color: studentVeriStatus ? '#888' : '',
                                    cursor: studentVeriStatus ? 'not-allowed' : 'default',
                                    }}
                                    onClick={studentVeriStatus? undefined : () => setShowStudentVeri(true)}
                                    // onClick={() => setShowStudentVeri(true)}
                                    text={text}
                                />}
                            </FormattedMessage>
                        </div>

                    </div>

                    <BasicInfoEdit
                        showBasicInfo={showBasicInfoDiv}
                        isFocused={isFocused}
                        handleClose={handleShowBasicInfoDivClose}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                        username={username}
                        school={school}
                        setStudentVeriStatus={setStudentVeriStatus}
                    />

                    <PassWordEdit
                        showPasswordDiv={showPasswordDiv}
                        handleClose={handlePassWordDivClose}
                        isFocused={isFocused}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                    />

                    <StudentVeri
                        showStudentVeri={showStudentVeri}
                        handleClose={handleStudentVeriDivClose}
                        isFocused={isFocused}
                        handleInputFocus={handleInputFocus}
                        handleInputBlur={handleInputBlur}
                    />

                </div>
                <div className={editStyles.section2}>
                    <SelfInfo setIntroText={setIntroText} introText={introText} />
                </div>
            </div>
        </div>
    );
}

export default Edit;