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
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      border-radius: 3px;
      transition: background-color 0.16s ease;
      border: 0;
      color: #fff;
      font-size: 12px;
      padding: 0 15px;
      text-transform: uppercase;
      font-weight: 700;
      height: 44px;
      font-size: 18px;
      background: #00bb5e;

      &:hover {
        background: #00954a;
      }
    }
  }
`;

export const IconText = styled.i`
  margin-right: 5px;
`;

export const Icon = styled.i`
  font-size: 20px;
`;

export const BoxTable = styled.div`
  padding: 0 30px;
`;

export const TableCustom = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead {
    tr {
      background: #c8d3e6;
    }
  }

  tbody {
    tr {
      &:hover {
        background: #ecf0f6;
      }
    }
  }
`;

export const Tth = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const Ttd = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  span {
    padding: 5px;
    margin: 4px 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
export const Info = styled.div`
  text-align: center;
`;

export const BoxBtn = styled.div`
  width: 100%;
  text-align: right;

  a {
    border-radius: 3px;
    transition: background-color 0.16s ease;
    background: #7289da;
    border: 0;
    color: #fff;
    font-size: 12px;
    padding: 9.6px 15px;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    height: 36px;
    font-size: 14px;
    &:hover {
      opacity: 0.8;
    }
  }

  button {
    margin-left: 10px;
  }
`;
