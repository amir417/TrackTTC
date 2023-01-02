import styled from 'styled-components';

const BurgerbarWrapper = styled.div`
  position: fixed;
  top: 0%;
  right: 0%;
  margin-top: 1.0rem;
  margin-right: 2.0rem;
  @media (min-width: 750px) {
    display: none;
  }
`;

const WhiteLine = styled.span`
  display: flex;
  width: 3rem;
  height: 0.6rem;
  margin: 0.5rem 0;
  border-radius: 3px;
  position: relative;
  background: #fff;
  z-index: 100;
  cursor: pointer;
`;

const BurgerBar = (props) => {
  return (
    <BurgerbarWrapper onClick={props.onClick}>
      <WhiteLine/>
      <WhiteLine/>
      <WhiteLine/>
    </BurgerbarWrapper>
  );
}

export default BurgerBar;