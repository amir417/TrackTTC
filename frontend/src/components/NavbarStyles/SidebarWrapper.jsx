import styled from 'styled-components';

const SideWrapper = styled.div`
  position: fixed;
  display: grid;
  height: calc(100vh - min(8vw, 1.5rem));
	width: min(45vw, 20rem);
	overflow-x: hidden; 
  overflow-y: auto;
  background: #091f36;
	right: 0%; top: 0%;
	transition: all 0.7s cubic-bezier(.53, -0.41, .55, 1.2);
`;

const SidebarWrapper = (props) => {
  return (
    <SideWrapper>
      {props.children}
    </SideWrapper>
  );
}

export default SidebarWrapper;