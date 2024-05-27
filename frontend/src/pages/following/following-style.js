import styled from 'styled-components';

export const Container = styled.div`
    width: 40%;
    height: 60%;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: auto;

    @media screen and (max-width: 768px) {
        width: 80%;
        height: 50%;
    }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FollowingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0; /* 移除多餘的頂部空間 */
`;

export const FollowingItem = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  justify-content: space-between;


  &:hover {
    background-color: #f5f5f5;
  }
  
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const Username = styled.span`
  flex: 1;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

export const UnfollowButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.isLoading ? '#cccccc' : '#ff4d4d'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${props => props.isLoading ? '#cccccc' : '#ff1a1a'};
  }
`;


export const DisabledButton = styled.button`
  padding: 5px 10px;
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;

  &:hover {
    background-color: #cccccc;
  }
`;