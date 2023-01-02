import styled from 'styled-components';
import { useState } from "react";
import Subtitle from './subcomponent/Subtitle';
import { BoxWrapper, WhiteWrapper, StyledInput, Button } from './SubmitBoxStyles';
import { Bold } from './subcomponent';

const FontBlack = styled.span`
  color: #000;
`;

const Signup = () => {
  let favAry = [];
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');

  // const [fav, setfav] = useState('');
  // const [bus, setary] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  const blog = {fname, lname, email, password};
  console.log (blog);


  fetch ('http://localhost:5000/signup', {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(blog)
  })
  .then((res) => res.json())
  .then ((data) =>  {
    console.log (data);
    if (data.status == "ok"){
      console.log ("Your signup have been saved.")
      window.open("./login");
    }
    else if (data.error == "User Exists"){
      alert ("User Exists. Please try again");
    }
    else {
      alert(data.error);
    }
  }) }

  return (
    <BoxWrapper> 
      <WhiteWrapper>
        <Subtitle><FontBlack><Bold>JOIN TrackTC</Bold> and never be late again!</FontBlack></Subtitle><br/>
        {/* <Select options={options} onChange={setary} width="2000px" defaultValue={ary} isMulti/><br/>{console.log(fav)} */}
        <form onSubmit={handleSubmit}>
          {/* <input type="hidden" onChange={console.log(fav)} value={fav}/> */}
          <StyledInput type="text" onChange={(e) => setfname(e.target.value)} placeholder="Your first name"/> 
          <StyledInput type="text" onChange={(e) => setlname(e.target.value)} placeholder="Your last name"/> 
          <StyledInput type="email" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/>
          <StyledInput type="password" onChange={(e) => setpass(e.target.value)} placeholder="Password"/>
          {/* <StyledInput type="password" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/> */}
          <Button/>
        </form>
      </WhiteWrapper>
    </BoxWrapper>
  );
}

export default Signup;