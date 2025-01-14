import React, { useState } from "react"; // Import useState
import { HiUser } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";

const Container = styled.div`
  position: relative;
`;

const NavItem = styled(NavLink)`
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

const LoginBtn = styled(Link)`
  display: block;
  background-color: var(--dark-grey-2);
  color: var(--white-1);
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

const SignUpBtn = styled(Link)`
  display: block;
  background-color: transparent;
  color: var(--dark-grey-2);
  width: 100%;
  padding: 1rem 0;
  border: 2px solid var(--dark-grey-2);
  border-radius: 5px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
`;

const HelloContianer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--dark-grey-2);
`;

const Username = styled.h2`
  font-size: 2rem;
  color: var(--dark-grey-2);
`;

const LinkContainer = styled.div`
  padding-top: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;

const LinkItem = styled(Link)`
  font-size: 1.5rem;
  color: var(--dark-grey-2);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutLink = styled(Link)`
  font-size: 1.4rem;
  color: var(--dark-grey-2);
`;

function Account() {
  const { auth } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Container
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <NavItem to="account">
        <HiUser /> Account
      </NavItem>
      <ToolTip show={showTooltip}>
        {auth ? (
          <>
            <HelloContianer>
              <HiUser size={20} />
              <Username>Hello, {auth.user?.name.split(" ")[0]}</Username>
            </HelloContianer>
            <LinkContainer>
              <LinkItem to="/account/details">My Account</LinkItem>
              <LinkItem to="/account/addresses">Manage Addresses</LinkItem>
              <LinkItem to="/account/orders">Orders</LinkItem>
              <LinkItem to="/account/changePassword">Change Password</LinkItem>
              <LogoutLink to="/account/logout">Logout</LogoutLink>
            </LinkContainer>
          </>
        ) : (
          <>
            <LoginBtn to="/login">Login</LoginBtn>
            <SignUpBtn to="/signup">Create Account</SignUpBtn>
          </>
        )}
      </ToolTip>
    </Container>
  );
}

export default Account;
