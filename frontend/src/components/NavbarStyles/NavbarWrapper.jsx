import styled from 'styled-components';

const NavWrapper = styled.div`
  width: 100%;
  height: 6rem;
  background: #091f36;
  z-index: 15;
  position: fixed;	
  left: 0;
  top: 0;
  padding: 0 10vw;
  box-shadow: 0 0 10px 10px rgba(0, 0, 3, 0.2);
`;

const NavbarWrapper = (props) => {
  return (
    <NavWrapper>
      {props.children}
    </NavWrapper>
  );
}

export default NavbarWrapper;