// CoverPhoto.js
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

export default function PostPhoto({ src }) {
    const [coverPhoto, setCoverPhoto] = useState(null);

    useEffect(() => {
        if (src) {
            isValidImageBase64(src).then(isValid => {
                if (isValid) {
                    setCoverPhoto(src);
                }
            });
        }
    }, [src]);

    if (!coverPhoto) return null;

    return <PostImage src={coverPhoto} alt="Cover" />;
}
