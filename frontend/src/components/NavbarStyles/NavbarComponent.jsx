import styled from 'styled-components';

const NavComponent = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  margin-right: 7vw;
  display: flex;
  gap: 5vw;
  @media (max-width: 750px) {
    display: none;
  }
`;

const NavbarComponent = (props) => {
  return (
    <NavComponent>
      {props.children}
    </NavComponent>
  );
}

export default NavbarComponent;