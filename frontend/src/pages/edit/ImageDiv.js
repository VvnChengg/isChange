import React, { Fragment, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { editApi } from '../../api/editApi';
import editStyles from '../../styles/Edit.module.css';
import Button from "../../components/Button";
import { FormattedMessage } from 'react-intl';

// 匯入編輯大頭貼的元件
export const ImageUploadDiv = ({ photo, setPhoto }) => {
    const editorRef = useRef(null);
    const [image, setImage] = useState('/icons/profile.png');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 選擇圖片
    const handleFileChange = (event) => {
        let file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        setImage(URL.createObjectURL(file));
        setModalIsOpen(true);
    };

    // 儲存圖片
    const handleSave = async () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const dataUrl = canvas.toDataURL();
            // Save dataUrl to your state
            setImage(dataUrl);
            setPhoto(dataUrl);


            // Send request here
            if (dataUrl && dataUrl !== '/icons/profile.png') {
                // console.log(dataUrl);
                const formData = new FormData();
                const file = dataURLtoFile(dataUrl, 'profile.png');
                formData.append('image', file);
                // console.log(file);
                try {
                    const token = localStorage.getItem('access_token');
                    const data = await editApi.editImage(formData, token);
                    console.log(data);
                    if (data.status === 'success') {
                        // console.log("更新後的圖片"+data.data.photo);
                        alert('更新成功');
                    }
                } catch (error) {
                    // console.error(error);
                    alert('更新失敗');
                }
            }
        }
        setModalIsOpen(false);
    };

    // 把base64轉成file
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        setImage(photo);
        // console.log(photo);
    }, [photo]);



    return (
        <Fragment>
            <div className={editStyles.sectionHeading}>
                <FormattedMessage id="edit.changeImage" />    
            </div>
            <div className={editStyles.editButton}>

                {modalIsOpen && <div className={editStyles.floatingDiv}>
                    {image && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin:'5%' }}>
                            <AvatarEditor
                                ref={editorRef}
                                image={image}
                                width={136}
                                height={136}
                                border={50}
                                borderRadius={68}
                                scale={1.2}
                            />
                        </div>)}
                    <FormattedMessage id='edit.cutImage'>
                        {(text) => <Button
                            style={{
                                width: '100%',
                            }}
                            onClick={handleSave}
                            text={text}
                        />}
                    </FormattedMessage>

                </div>}

                <div className={editStyles.profileImage}>
                    <img src={image || "/icons/profile.png"} alt='Profile' onError={(e) => { e.target.onerror = null; e.target.src = "/icons/profile.png"; }} />
                </div>

                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {/* <button className={editStyles.actionButton} onClick={() => document.getElementById('fileInput').click()}>上傳圖片</button> */}
                <FormattedMessage id='edit.uploadImage'>
                {text => <Button
                    style={{
                        width: '100%',
                    }}
                    onClick={() => document.getElementById('fileInput').click()}
                    text={text}
                />}
                </FormattedMessage>

            </div>

        </Fragment>
    );
};