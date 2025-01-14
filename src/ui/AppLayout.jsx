import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Main = styled.main`
  min-height: calc(100vh - 8rem);
`;

function AppLayout() {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default AppLayout;
