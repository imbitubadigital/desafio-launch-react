import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  flex-direction: column;
`;
export const BoxLogo = styled.div`
  display: flex;
  height: 140px;
  background: #595f61;
  width: 100%;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;
export const LinkCustom = styled(NavLink)`
  flex: 1;
  background: #364043;
  margin: 1px 0;
  padding: 10px;
  color: #fff;
  font-size: 18px;
  text-decoration: none;

  i {
    color: #ff4b39;
    margin-right: 10px;
  }

  &:hover {
    background: #595f61;
    transition: 0.3s all;
  }

  &.active {
    background: #ff4b39;
    i {
      color: #fff;
    }
  }
`;
