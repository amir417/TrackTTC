import styled from 'styled-components';

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10vw;
  max-width: 40rem;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 10vh 0;
  min-height: 60vh;
`
const WhiteWrapper = (props) => {
  return (
    <WhiteBox>
      {props.children}
    </WhiteBox>
  );
}

export default WhiteWrapper;