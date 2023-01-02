import { NavLink } from "react-router-dom";
import { useState } from "react";
import { NavbarWrapper, NavbarComponent, SidebarWrapper, NavTitle, NavFont, SideFont, XBar, BurgerBar } from './NavbarStyles';

const VerifiedNavbar = () => {
  const [sideBarOn, updateSideBarOn] = useState(false);
  return (
      <>
        <NavbarWrapper>
          <NavTitle>TrackTC</NavTitle>
          <NavbarComponent>
            <NavLink title="home" to="/" style={{textDecoration: 'none'}}><NavFont>Home</NavFont></NavLink>
            <NavLink title="account" to="/account" style={{textDecoration: 'none'}}><NavFont>Account</NavFont></NavLink>
            <NavLink onClick={() =>{
                window.localStorage.setItem("loggedIn", false);
                window.localStorage.clear();
                window.location.reload()
                }}
              title="logout" to="/" style={{textDecoration: 'none'}}><NavFont>Logout</NavFont></NavLink>
              </NavbarComponent>
          <BurgerBar onClick={() => updateSideBarOn(true)}/>
          { sideBarOn 
            ? <SidebarWrapper>
                <XBar onClick={() => updateSideBarOn(false)}/><br/>
                <NavLink title="home" to="/" style={{textDecoration: 'none'}}><SideFont>Home</SideFont></NavLink>
                <NavLink title="account" to="/account" style={{textDecoration: 'none'}}><SideFont>Account</SideFont></NavLink>
                <NavLink onClick={() =>{
                  window.localStorage.setItem("loggedIn", false);
                  window.localStorage.clear();
                  window.location.reload()
                }}
                title="logout" to="/" style={{textDecoration: 'none'}}><SideFont>Logout</SideFont></NavLink>
              </SidebarWrapper> 
            : <></>
          }
        </NavbarWrapper>
      </>
    );
}

export default VerifiedNavbar;