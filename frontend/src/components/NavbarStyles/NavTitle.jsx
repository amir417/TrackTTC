import styled from 'styled-components';

const NavbarTitle = styled.h1`
  color: #fff;
  text-decoration: none;
  transition: all 0.1s ease-out;
  margin-right: 25vw;
  margin-top: 1.5rem;
`;

const NavTitle = (props) => {
  return (
    <NavbarTitle>
      {props.children}
    </NavbarTitle>
  );
}

export default NavTitle;