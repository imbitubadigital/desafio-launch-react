import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: auto;
  padding-bottom: 40px;

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
      border-radius: 3px;
      transition: background-color 0.16s ease;
      background: #7289da;
      border: 0;
      color: #fff;
      font-size: 12px;
      padding: 0 15px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      height: 44px;
      font-size: 18px;

      &:hover {
        opacity: 0.8;
        transition: 0.3s all;
      }
    }
  }
`;

export const IconText = styled.i`
  margin-right: 5px;
`;

export const BoxTable = styled.div`
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  form {
    display: flex;
    min-height: 200px;
    max-width: 65%;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    justify-content: space-between;
    align-items: stretch;
    background: #ecf0f6;

    label {
      margin-top: 20px;
      font-size: 18px;
      display: block;
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
        border: 2px solid #2684ff;
      }
    }

    span {
      margin-bottom: 10px;
      color: red;
    }

    select {
      width: 100%;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid #ccc;
      margin-bottom: 5px;
      background: #fff;
      font-size: 16px;

      &:focus {
        background: #fff9a8 !important;
        border: 2px solid #2684ff;
      }
    }
    textarea {
      width: 100%;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid #ccc;
      margin-bottom: 5px;
      background: #fff;
      font-size: 16px;

      &:focus {
        background: #fff9a8;
        border: 2px solid #2684ff;
      }
    }
  }
`;
export const BoxSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const LabelCustom = styled.label``;
export const ItemSelect = styled.div`
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Box2 = styled.div`
  flex-basis: 48%;
`;

export const BoxStatus = styled.div`
  background: #fff;
  float: left;
  width: 100%;
  border-radius: 5px;
  padding: 0 5px;
  border: 1px solid #ccc;
  position: relative;
  label {
    width: 80px;
    margin: 0;
    display: inline-block;
    margin: 0 0;
    float: left;
  }
  input {
    width: 25px !important;
    margin: 23px 0 0;
    padding: 0;
    float: left;
  }
  span {
    display: block;
  }
`;

export const DivButton = styled.div`
  margin-top: 30px;
  button {
    width: 100%;
  }
`;

export const BoxImage = styled.div`
  min-height: 400px;
  width: 100%;
  max-width: 32%;
`;

export const Image = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-bottom: 30px;
  cursor: pointer;
`;

export const BoxDrop = styled.div`
  position: relative;
`;

export const Drop = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 3px solid #c1c1c1;
  margin-bottom: 30px;
  border-style: dashed;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s;
  background: #999;

  &:hover {
    color: #fff;
    border-color: #fff;
  }

  i {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

export const BoxLoad = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  i {
    font-size: 50px;
    color: #fff;
    margin-bottom: 15px;
    animation: loading 1s cubic-bezier(0.25, 0.25, 0.25, 0.25) infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const TextLoad = styled.p`
  color: #fff;
  font-size: 18px;
`;
