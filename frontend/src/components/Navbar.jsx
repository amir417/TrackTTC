import { NavLink } from "react-router-dom";
import { useState } from "react";
import { NavbarWrapper, NavbarComponent, SidebarWrapper, NavTitle, NavFont, SideFont, XBar, BurgerBar } from './NavbarStyles';

const Navbar = () => {
  const [sideBarOn, updateSideBarOn] = useState(false);
  return (
      <>
        <NavbarWrapper>
          <NavTitle>TrackTC</NavTitle>
          <NavbarComponent>
            <NavLink title="home" to="/" style={{textDecoration: 'none'}}><NavFont>Home</NavFont></NavLink>
            <NavLink title="signup" to="/signup" style={{textDecoration: 'none'}}><NavFont>Sign Up</NavFont></NavLink>
            <NavLink title="login" to="/login" style={{textDecoration: 'none'}}><NavFont>Login</NavFont></NavLink>
          </NavbarComponent>
          <BurgerBar onClick={() => updateSideBarOn(true)}/>
          { sideBarOn 
            ? <SidebarWrapper>
                <XBar onClick={() => updateSideBarOn(false)}/><br/>
                <NavLink title="home" to="/" style={{textDecoration: 'none'}}><SideFont>Home</SideFont></NavLink>
                <NavLink title="signup" to="/signup" style={{textDecoration: 'none'}}><SideFont>Sign Up</SideFont></NavLink>
                <NavLink title="login" to="/login" style={{textDecoration: 'none'}}><SideFont>Login</SideFont></NavLink>
              </SidebarWrapper> 
            : <></>
          }
        </NavbarWrapper>
      </>
    );
}

export default Navbar;