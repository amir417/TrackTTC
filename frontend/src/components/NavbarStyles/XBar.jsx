import styled from 'styled-components';

const XBarWrapper = styled.div`
  position: fixed;
  top: 0%;
  right: 0.5%;
  z-index: 1000;
  cursor: pointer;
`;

const Xbar = styled.div`
  display: inline-block;
  color: #777;
  text-decoration: none;
  transition: all 0.1s ease-out;
  font-size: 5rem;
  margin-right: 1rem;
  &:hover {
    color: #fff;
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`;

const XBar = (props) => {
  return (
    <XBarWrapper onClick={props.onClick}>
      <Xbar>×</Xbar>
    </XBarWrapper>
  );
}

export default XBar;