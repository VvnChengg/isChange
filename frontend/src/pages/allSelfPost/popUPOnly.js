import React from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';


const PopupOnly = ({ onConfirm, onCancel ,postIdToDelete, postTypeToDelete}) => {
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = window.localStorage.getItem('access_token');
    const handleConfirm = () => {
        axios.delete(`${hostname}/post/delete`, {
            headers: {
                'Authorization':  `Bearer ${token}`
            },
            data: {
                id: postIdToDelete,
                type:postTypeToDelete, 
            }
        })
            .then(response => {
                console.log('Post deleted successfully');
                onConfirm(); 
                console.log(response.data.message);
                window.location.reload(); 
            })
            .catch(error => {
                console.error('Failed to delete post:', error);
                console.log(error.response.data.message);
            });
    };

    return (
        <Modal
            //title="Confirmation"
            open={true} 
            onCancel={onCancel} // 取消
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    <FormattedMessage id='selfpost.cancel' />
                </Button>,
                <Button key="confirm" type="primary" onClick={handleConfirm}>
                    <FormattedMessage id='msg.confirmButton' />
                </Button>,
            ]}
        >
            <p><FormattedMessage id='selfpost.cancelnotification' /></p>
        </Modal>
    );
};


export default PopupOnly;

