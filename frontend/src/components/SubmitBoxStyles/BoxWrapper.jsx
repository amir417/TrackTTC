import styled from 'styled-components';

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - min(7vh, 4rem));
  width: 100%;
  margin-top: 7rem;
  max-height: 100vh;
  align-items: center;
  text-align: center;
`;

const BoxWrapper = (props) => {
  return (
    <BoxWrap>
      {props.children}
    </BoxWrap>
  );
}

export default BoxWrapper;