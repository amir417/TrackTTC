import styled from 'styled-components';

const StyledButton = styled.input`
  background: #fff;
  color: #000;
  width: min(5vw, 15rem);
  min-width: 8rem;
  cursor: pointer;
  padding: 1% 0;
  border: 2px solid #000;
  border-radius: 4px;
  font-family: 'DM Sans';
  margin: min(1rem, 3vh) 0;
`;

const Button = () => {
  return (
    <>      
      <StyledButton type="submit" value="Submit"/>
    </>
  );
}

export default Button;