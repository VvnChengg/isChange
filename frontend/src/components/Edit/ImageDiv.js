import React, { Fragment, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';

export const ImageUploadDiv = ({setImageURL}) => {
    const editorRef = useRef(null);
    const [image, setImage] = useState('/icons/profile.png');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleFileChange = (event) => {
        let file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        setImage(URL.createObjectURL(file));
        setModalIsOpen(true);
    };
    const handleSave = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const dataUrl = canvas.toDataURL();
            // Save dataUrl to your state
            setImage(dataUrl);
            setImageURL(dataUrl);
        }
        setModalIsOpen(false);
    };


    return (
        <Fragment>
            <div className="section-heading">頭像編輯</div>
            <div className="edit-button">

                {modalIsOpen &&<div className='floating-div'>
                    {image && (
                        <AvatarEditor
                            ref={editorRef}
                            image={image}
                            width={136}
                            height={136}
                            border={50}
                            borderRadius={68}
                            scale={1.2}
                        />
                    )}

                    <button onClick={handleSave}>裁減</button>
                </div>}
                <div className="profile-picture">
                    {image && <img src={image} className="profile-image" alt="Preview"/>}
                </div>

                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <button onClick={() => document.getElementById('fileInput').click()}>上傳圖片</button>
            </div>

        </Fragment>
    );
};