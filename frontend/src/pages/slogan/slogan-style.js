import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledMotionDiv = styled(motion.div)`
    width: 300px;
    height: 300px;
    background-color: transparent;
    background-image: url('/icons/slogan.png');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;  // Change the direction of flex items
    justify-content: center;  // Align items along the vertical axis
    align-items: center;
    color: white;
    font-size: 24px;
    border-radius: 25%;
    text-align: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    opacity: ${props => props.backgroundImageLoaded ? 1 : 0};  // Control the opacity based on the backgroundImageLoaded prop
    animation: ${pulse} 2s infinite;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 200px;
        height: 200px;
        font-size: 18px;
    }

    &:hover {
        background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("/icons/slogan.png");
    }`;

export default StyledMotionDiv;