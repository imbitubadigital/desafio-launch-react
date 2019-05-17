import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100%;

  header {
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
  }
`;

export const Info = styled.p`
  width: 100%;
  text-align: left;
  font-size: 22px;
  font-weight: 300;
  margin-top: 10px;
  padding-left: 50px;
`;

export const Title = styled.p`
  width: 100%;
  font-size: 30px;
  font-weight: 300;
  color: red;
  margin-top: 40px;
  padding-left: 50px;
`;
export const Item = styled.p`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 300;
  padding-left: 50px;
  margin-top: 20px;
`;
