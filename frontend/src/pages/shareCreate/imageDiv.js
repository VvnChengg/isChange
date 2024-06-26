import React, { Fragment, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { api } from '../../api';
import editStyles from '../../styles/Edit.module.css';
import createStyles from './shareCreate-style.css';
import Button from '../../components/Button';
import { FormattedMessage } from 'react-intl';

// 匯入編輯大頭貼的元件
export const ImageUploadDiv = ({ photo, setPhoto }) => {
    const editorRef = useRef(null);
    const [image, setImage] = useState('https://cdn.builder.io/api/v1/image/assets/TEMP/3f570a0c69a52557b5a1cd2aabd09f0ea82824f62a802a9b9d432ad5b29bbd66?');
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
                {modalIsOpen && <div className={editStyles.floatingDiv}>
                    {image && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin:'5%' }}>
                            {/* <AvatarEditor
                                ref={editorRef}
                                image={image}
                                width={136}
                                height={136}
                                border={50}
                                borderRadius={68}
                                scale={1.2}
                            /> */}
                            <img src={image}/>
                        </div>)}
                    <FormattedMessage id='post.uploadImage'>
                        {(text) => <Button
                            style={{
                                width: '100%',
                            }}
                            onClick={handleSave}
                            text={text}
                        />}
                    </FormattedMessage>

                </div>}

                <input
                    type='file'
                    id='fileInput'
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <button className={createStyles.figureButton} onClick={() => document.getElementById('fileInput').click()}><img
                    loading='lazy'
                    src='/icons/postImageUploadButton.png'/>
                </button>
                {/* <FormattedMessage id='edit.uploadImage'>
                {text => <Button
                    onClick={() => document.getElementById('fileInput').click()}
                    text={text}
                />}
                </FormattedMessage> */}

            {/* </div> */}

        </Fragment>
    );
};