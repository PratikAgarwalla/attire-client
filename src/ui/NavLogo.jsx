import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 7.5rem;
  height: auto;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

function NavLogo() {
  return (
    <Link to="/">
      <LogoImg src="/logo-white.png" alt="logo" />
    </Link>
  );
}

export default NavLogo;
