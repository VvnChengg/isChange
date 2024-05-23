import React, { useState, useEffect } from 'react';
import { PostImage } from './Post-style.js';

function isValidImageBase64(str) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = str;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

export default function AsyncImage(props) {
    // 定義一個狀態變量 `loadedSrc` 來保存當前加載完成的圖片 URL
    const [loadedSrc, setLoadedSrc] = useState(null);

    // 使用 `useEffect` 來處理圖片加載邏輯，依賴於 `props.src` 變化
    useEffect(() => {
        // 每次 `props.src` 變化時，先將 `loadedSrc` 設置為 null
        setLoadedSrc(null);

        // 如果 `props.src` 存在，則開始加載圖片
        if (props.src) {
            // 定義一個處理圖片加載完成的回調函數
            const handleLoad = () => {
                setLoadedSrc(props.src);
            };

            // 創建一個新的 Image 對象
            const image = new Image();
            // 當圖片加載完成時，調用 `handleLoad`
            image.addEventListener('load', handleLoad);
            // 設置圖片的來源 URL，開始加載圖片
            image.src = props.src;

            // 返回一個清理函數，在組件卸載或 `props.src` 改變時移除事件監聽器
            return () => {
                image.removeEventListener('load', handleLoad);
            };
        }
    }, [props.src]); // 當 `props.src` 改變時重新運行 `useEffect`

    // 如果圖片已經加載完成，渲染 <img> 元素，否則返回 null
    if (loadedSrc === props.src) {
        return <PostImage {...props} />;
    }
    return null;
}
