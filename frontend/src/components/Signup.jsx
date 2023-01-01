import styled from 'styled-components';
import Select from "react-select";
import { useState } from "react";
// import { useEffect } from 'react';

const SignUpWrapper = styled.div`
  margin: min(20rem, 30vh) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.input`
  background: #fff;
  color: #000;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 4px;
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


 
  return ( <>
    <SignUpWrapper> 
      <legend> JOIN TrackTC and never be late again!</legend><br/>
      {/* <Select options={options} onChange={setary} width="2000px" defaultValue={ary} isMulti/><br/>{console.log(fav)} */}
      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" onChange={console.log(fav)} value={fav}/> */}
        <InputWrapper type="text" onChange={(e) => setfname(e.target.value)} placeholder="Your first name"/> <br/>
        <InputWrapper type="text" onChange={(e) => setlname(e.target.value)} placeholder="Your last name"/> <br/>
        <InputWrapper type="email" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/><br/>
        <InputWrapper type="password" onChange={(e) => setpass(e.target.value)} placeholder="Password"/><br/>
        {/* <InputWrapper type="password" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/> <br/> */}
        <input type="submit" value="Submit"/>
      </form>
    </SignUpWrapper>
    </>);
}

export default Signup;