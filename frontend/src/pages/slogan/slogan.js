import React, { useState, useEffect } from 'react';
import StyledMotionDiv from './slogan-style';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

export default function SloganAnimation() {
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const image = new Image();
        image.src = '/icons/slogan.png';
        image.onload = () => setBackgroundImageLoaded(true);  // Set backgroundImageLoaded to true when the image is loaded
    }, []);

    const handleClick = () => {
        navigate('/');  // Navigate to the next page when the animated element is clicked
    };


    if(!backgroundImageLoaded) return <Spin/>;  // Display a loading spinner while the image is loading
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',  // Add this line to center vertically
            height: '100vh',  // Add this line to make the div take up the full viewport height
        }}>

            <StyledMotionDiv
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={handleClick}
            >
                <div style={{ flex: 1 }} />
            </StyledMotionDiv>
            <div style={{ color: 'black', marginTop: '20px' }}>
                Discover the World, Exchange with isChange!
            </div>
        </div>
    );
};