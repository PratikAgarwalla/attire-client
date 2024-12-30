import React from "react";
import { HiHeart, HiShoppingBag, HiShoppingCart, HiUser } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Account from "./Account";
import Bag from "./Bag";
import Wishlist from "./Wishlist";

const MainUserBar = styled.div`
  flex: 2;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.6rem;
`;

function UserNav() {
  return (
    <MainUserBar>
      <Wishlist />
      <Account />
      <Bag />
    </MainUserBar>
  );
}

export default UserNav;
