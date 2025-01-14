import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const NavItem = styled.p`
  display: flex;
  color: inherit;
  text-decoration: none;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: var(--white-4);
    cursor: pointer;
  }
`;

const ToolTip = styled.div`
  background-color: var(--white-1);
  color: var(--dark-grey-1);
  width: 30rem;
  height: auto;
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 2rem;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: ${({ show }) =>
    show ? "block" : "none"}; /* Control visibility based on show prop */

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 1rem;
    border-style: solid;
    border-color: transparent transparent var(--white-1);
    border-radius: 1px;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  text-align: center;
  text-transform: uppercase;
`;

function Wishlist() {
  const [show, setShow] = useState(false);
  return (
    <Container
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <NavItem>
        <HiHeart /> Wishlist
      </NavItem>
      <ToolTip show={show}>
        <Title>Yet to implement</Title>
      </ToolTip>
    </Container>
  );
}

export default Wishlist;
