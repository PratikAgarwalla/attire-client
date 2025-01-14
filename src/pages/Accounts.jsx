import React from "react";
import {
  HiKey,
  HiLocationMarker,
  HiLogout,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";

const Container = styled.div`
  width: 100%;
  padding: 5rem;
  display: flex;
  align-items: flex-start;
  gap: 5rem;
`;

const Menu = styled.div`
  flex: 0.35;
  background-color: var(--dark-grey-6);
  color: var(--dark-grey-2);
  border-radius: 15px;
  overflow: hidden;
`;

const MenuItem = styled(NavLink)`
  display: block;
  color: var(--dark-grey-2);
  font-size: 2rem;
  font-weight: 600;
  padding: 2.5rem 0;
  margin: 0 2.5rem;
  text-decoration: none;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--white-4);
  }

  &.active {
    margin: 0;
    padding: 2.5rem;
    background-color: var(--dark-grey-2);
    color: var(--dark-grey-6);
  }
`;

const Text = styled.p`
  margin-bottom: -4px;
`;

const Content = styled.div`
  flex: 0.65;
`;

const ContentBox = styled.div`
  width: 100%;
  border: 1px solid var(--white-4);
  border-radius: 7.5px;
  padding: 3rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 2rem;
  width: 100%;
  border-bottom: 1px solid var(--white-4);
`;

function Accounts() {
  const { auth } = useAuth();
  return auth ? (
    <Container>
      <Menu>
        <MenuItem to="details">
          <HiUser size={20} />
          <Text>My Account</Text>
        </MenuItem>
        <MenuItem to="addresses">
          <HiLocationMarker size={20} />
          <Text>Manage Addresses</Text>
        </MenuItem>
        <MenuItem to="orders">
          <HiShoppingBag size={20} />
          <Text>Orders</Text>
        </MenuItem>
        <MenuItem to="changePassword">
          <HiKey size={20} />
          <Text>Change Password</Text>
        </MenuItem>
        <MenuItem to="logout">
          <HiLogout size={20} />
          <Text>Logout</Text>
        </MenuItem>
      </Menu>
      <Content>
        <Outlet />
      </Content>
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Accounts;
