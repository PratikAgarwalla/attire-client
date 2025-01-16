import React from "react";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 7.5rem;
  height: auto;
`;

function Logo() {
  return <LogoImg src="/logo-black.png" alt="logo" />;
}

export default Logo;
