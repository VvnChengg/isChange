import React from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';


const PopupOnly = ({ onConfirm, onCancel ,postIdToDelete}) => {
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = window.localStorage.getItem('access_token');
    const handleConfirm = () => {
        axios.delete(`${hostname}/post/${postIdToDelete}`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Post deleted successfully');
                onConfirm(); 
                console.log(response.data.message);
            })
            .catch(error => {
                console.error('Failed to delete post:', error);
                console.log(error.response.data.message);
            });
    };

    return (
        <Modal
            title="Confirmation"
            open={true} // 这里根据需要设置是否可见
            onCancel={onCancel} // 取消按钮点击事件
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="confirm" type="primary" onClick={handleConfirm}>
                    Confirm
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete?</p>
        </Modal>
    );
};


export default PopupOnly;

