import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

export const BoxMenu = styled.div`
  flex-basis: 200px;
  min-height: 100%;
  background: #2c3437;
`;

export const BoxRight = styled.div`
  flex: 1;
  min-height: 100%;
  flex-direction: column;
`;
export const BoxTop = styled.div`
  width: 100%;
  height: 50px;
  background: #1e2427;
`;

export const BoxCenter = styled.div`
  flex: 1;
  width: 100%;

  padding: 20px;
`;
