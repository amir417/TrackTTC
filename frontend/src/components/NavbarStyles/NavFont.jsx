import styled from 'styled-components';

const NavbarFont = styled.h2`
  display: inline-block;
  color: #777;
  text-decoration: none;
  margin-top: 1.5rem;
  transition: all 0.1s ease-out;
  &:hover {
    color: #fff;
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`;

const NavFont = (props) => {
  return (
    <NavbarFont>
      {props.children}
    </NavbarFont>
  );
}

export default NavFont;