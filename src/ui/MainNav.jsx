import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MainNavBar = styled.div`
  flex: 4;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7.5rem;
  font-size: 2rem;
`;

const NavItem = styled(NavLink)`
  text-transform: uppercase;
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: var(--white-4);
    cursor: pointer;
  }
`;

function MainNav() {
  return (
    <MainNavBar>
      <NavItem to="mens">Mens</NavItem>
      <NavItem to="womens">Womens</NavItem>
      <NavItem to="wetsuits">Wetsuits</NavItem>
    </MainNavBar>
  );
}

export default MainNav;
