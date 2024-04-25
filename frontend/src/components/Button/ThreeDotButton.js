import React from 'react';
import styled from 'styled-components';

const StyledThreeDotButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1vh; 
  height: 3vh; 
  background-color: transparent;
  border: none;
  cursor: pointer;

  div {
    width: 0.5vh;
    height: 0.5vh;
    background-color: #008CD9; ; 
    border-radius: 50%;
  }
`;

const ThreeDotButton = () => {
  return (
    <StyledThreeDotButton>
      <div></div>
      <div></div>
      <div></div>
    </StyledThreeDotButton>
  );
};

export default ThreeDotButton;
