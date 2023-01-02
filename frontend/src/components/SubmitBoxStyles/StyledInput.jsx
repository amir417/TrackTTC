import styled from 'styled-components';

const InputWrapper = styled.input`
  background: #fff;
  color: #000;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  height: min(1.5rem, 4.5vw);
  border: 2px solid #000;
  border-radius: 4px;  
  font-family: 'DM Sans';
`;

const StyledInput = (props) => {
  return (
    <>
      <InputWrapper type={props.type} onChange={props.onChange} placeholder={props.placeholder}/>
      <br/>
    </>
  );
}

export default StyledInput;