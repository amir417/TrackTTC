import styled from 'styled-components';

const BoldSpan = styled.span`
  font-family: 'DM Sans Bold';
`;

const Bold = (props) => {
  return (
    <BoldSpan>
      {props.children}
    </BoldSpan>
  );
}

export default Bold;