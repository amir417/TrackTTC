import styled from 'styled-components';
import Select from "react-select";
import { useState } from "react";
import { useEffect } from 'react';

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

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  

const handleSubmit = (e) => {
  e.preventDefault();
  const blog = {email, password};
  console.log (blog);

  fetch("http://localhost:5000/login", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(blog) ,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status == "ok") {
        // alert("login successful");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "./account";
      }
      else {
        alert (data.error);
      }
    });
}

  return (
    <SignUpWrapper> 
      <legend> Login to your account to set your alert preferences:</legend><br/>
      {/* <Select options={options} onChange={setary} width="2000px" defaultValue={ary} isMulti/><br/>{console.log(fav)} */}
      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" onChange={console.log(fav)} value={fav}/> */}
        <InputWrapper type="email" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/> <br/>
        <InputWrapper type="password" onChange={(e) => setpassword(e.target.value)} placeholder="Your password"/><br/>
        {/* <InputWrapper type="password" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/> <br/> */}
        <input type="submit" value="Submit"/>
      </form>
    </SignUpWrapper>
  );
}

export default Login;