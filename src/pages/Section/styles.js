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
`;
export const Info = styled.div`
  text-align: center;
`;

export const BoxBtn = styled.div`
  width: 100%;
  text-align: right;

  button {
    margin-left: 10px;
  }
`;

export const BoxModal = styled.div`
  background: #ecf0f6;
  border-radius: 7px 7px 0 0;
  h1 {
    background: #ddd;
    font-size: 16px;
    border-radius: 7px 7px 0 0;
    padding: 5px 15px;
    margin-bottom: 15px;
  }

  form {
    display: flex;
    min-height: 200px;
    flex-direction: column;
    padding: 20px;
    justify-content: space-between;
    align-items: stretch;
    div {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;

      height: 100%;
      label {
        font-size: 16px;
        margin-bottom: 5px;
      }

      input {
        width: 100%;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid #ccc;
        margin-bottom: 5px;
        background: #fff;
        font-size: 16px;
        &:focus {
          background: #fff9a8;
        }
      }

      span {
        margin-bottom: 10px;
        color: red;
      }
    }
  }
`;

export const BtnClose = styled.button`
  background: #e04848;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 18px;
  border: 0;
  &:hover {
    background: #a43d3d;
    transition: 0.3s all;
  }
`;
