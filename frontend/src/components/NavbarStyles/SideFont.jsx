import styled from 'styled-components';

const SidebarFont = styled.h2`
  display: inline-block;
  color: #777;
  text-decoration: none;
  margin-left: 1.5rem;
  transition: all 0.1s ease-out;
  &:hover {
    color: #fff;
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`;

const SideFont = (props) => {
  return (
    <SidebarFont>
      {props.children}
    </SidebarFont>
  );
}

export default SideFont;