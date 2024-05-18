// chat-room.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatRoom from '../../components/PrivateMessage/ChatRoom';
import ChatRoomInput from '../../components/PrivateMessage/ChatRoomInput';
import { useToken } from '../../hooks/useToken';

import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

export default function Chatroom() {
    const { chatid } = useParams();
    const [chatPhoto, setChatPhoto] = useState(null);
    const [chatData, setChatData] = useState(null);
    //const [newchatData, setnewChatData] = useState(null);
    const userId = window.localStorage.getItem('user_id');
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const token = useToken();
    const [inputValue, setInputValue] = useState('');
    let lastExecutionTime = 0;

    useEffect(() => {
        socket.on("receive-message", newMsg => {
            setChatData(prevChatData => [...prevChatData, newMsg]);
            console.log("[FE] Received message:", newMsg);
        });
    
        return () => {
            socket.off("receive-message");
        };
    
    }, []);

    const handleDownload = (imageUrl) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.jpg'; // 下載的文件名，可以自行設定
        link.style.display = 'none'; // 隱藏這個元素

        // 將這個元素添加到 body 中
        document.body.appendChild(link);

        // 模擬點擊這個鏈接
        link.click();

        // 清理
        document.body.removeChild(link);
    };


    const handleSubmit = () => {
        const currentTime = Date.now();
        if (currentTime - lastExecutionTime < 1000) {
            return;
        }

        lastExecutionTime = currentTime;

        if (inputValue.trim() !== '') {
            const body = { content: inputValue.trim(), };

            axios.post(`${hostname}/chat/sendtext/${chatid}`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    setChatData(prevChatData => [...prevChatData, response.data.new_message]);
                    setInputValue('');
                    scrollToBottom(100);
                    //console.log(response.data.new_message)
                    // 送訊息到 chatid 這個聊天室
                    socket.emit('send-message', response.data.new_message, chatid);
                })
                .catch(error => {
                    //console.error('API 請求失敗:', error);
                });
        } else {
            console.log('請輸入有效值');
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const scrollToBottom = (num) => {
        setTimeout(() => {
            const chatBox = document.querySelector('.private-message-chat-room-container');
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
            } else {
                //console.error('chatBox element not found!');
            }
        }, num);
    };

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', selectedFile);

        if (selectedFile) {
            const isImage = selectedFile.type.startsWith('image/');
            //轉成對應的格式
            if (isImage) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => {
                    const base64Image = reader.result;
                    const body = formData;
                    axios.post(`${hostname}/chat/sendpic/${chatid}`, body, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            //console.log(response.data.new_message)
                            const timestamp = new Date().toISOString();
                            const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
                            const newpic = { message_type: 'pic', timestamp: timestamp, photo: base64Image, sender_id: userId, _id: randomNumber }
                            //setChatData(prevChatData => [...prevChatData, response.data.new_message]);
                            //console.log(newpic)

                            setChatData(prevChatData => [...prevChatData, newpic]);


                            setTimeout(() => {
                                const chatBox = document.querySelector('.private-message-chat-room-container');
                                chatBox.scrollTop = chatBox.scrollHeight;
                            }, 100);
                            
                            socket.emit('send-message', response.data.new_message, chatid);
                        })

                        .catch(error => {
                            console.error('API 請求失败:', error);
                        });

                };
            } else {
                alert('請選擇圖片檔案 (JPG 或 PNG)');
            }
        }
    };



    useEffect(() => {
        axios.get(`${hostname}/chat/detail/${chatid}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setChatPhoto(response.data);
                setChatData(response.data.messages);
                scrollToBottom(0);
                //console.log(response)

                // 點進 detail 的時候，指定好 room (chatid)，之後就可以收到即時的訊息
                socket.emit("join-room", chatid);
                // console.log("[FE] A user join room:", chatid);
            })
            .catch(error => {
                //console.error('API 請求失敗:', error);
            });
    }, [hostname, chatid, token]);

    return (
        <div>
            {chatData && (
                <>
                    <ChatRoom chatData={chatData} chatPhoto={chatPhoto} userId={userId} handleDownload={handleDownload} />
                    <ChatRoomInput
                        handleInputChange={handleInputChange}
                        inputValue={inputValue}
                        handleSubmit={handleSubmit}
                        handleKeyDown={handleKeyDown}
                        handleFileInputChange={handleFileInputChange}
                    />
                </>
            )}
            {!chatData && (
                <div>Loading...</div>
            )}
        </div>
    );
}