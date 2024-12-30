import styled from "styled-components";
import NavLogo from "./NavLogo";
import MainNav from "./MainNav";
import UserNav from "./UserNav";

const NavigationBar = styled.div`
  width: 100%;
  height: 8rem;
  background-color: var(--dark-grey-2);
  color: var(--white-1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 5rem;
`;

function Navbar() {
  return (
    <NavigationBar>
      <NavLogo />
      <MainNav />
      <UserNav />
    </NavigationBar>
  );
}

export default Navbar;
