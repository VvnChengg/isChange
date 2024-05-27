import styled, { keyframes } from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';


export const PageContainer = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    width: 60%;
    margin: 0 auto;
    background-color: ${props => props.theme.fill};
    border: 1px solid #e1e8ed;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-top: 200px;
    position: absolute;
    top: 50px;
    box-shadow: ${props => props.theme.shadow};

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const HeaderBackground = styled.div`
    position: absolute;
    top: 100px;
    background-color: grey;
    width: 60%;
    height: 200px;
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px;
    background-size: cover;
    border-radius: 10px 10px 0 0;
    position: relative;
    border-bottom: 2px solid grey; // 添加这一行
`;

export const MemberContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; // 如果你想让所有元素垂直居中，可以添加这一行
    width: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
    }

`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #fff;
  position: absolute; // 修改这一行
  
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
  font-size: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  top: -75px;
  position: relative;
  width: 100%;
`;

export const Username = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

export const MemberButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const IntroInfo = styled.div`
  font-size: 20px;
  color: black;
  width: 50%;
  position: relative;
  top: -50px;
`;

export const NavInfo = styled.div`
  font-size: 20px;
  margin-top: 8px;
  color: black;
  width: 50%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const FloatingHeader = styled.div`
    position: fixed;
    top: 80px;
    left: 20%;
    width: 60%;
    display: ${props => props.show === undefined ? 'none' : 'flex'};
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    z-index: 5;
    border-bottom: 1px solid #e1e8ed;
    
    animation: ${props => props.show === undefined ? '' : props.show ? fadeIn : fadeOut} 0.5s ease-in-out forwards;
    @media (max-width: 768px) {
        width: 100%;
        left: 0;
    
    }
`;

export const NavBarAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledFaCheckCircle = styled(FaCheckCircle)`
    position: absolute;
    bottom: 0;
    right: 0;
    color: ${props => props.theme.main};
`;