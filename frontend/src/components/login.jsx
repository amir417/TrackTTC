import styled from 'styled-components';
import { useState } from "react";
import { Subtitle } from './subcomponent';
import { BoxWrapper, WhiteWrapper, StyledInput, Button } from './SubmitBoxStyles';
import { Bold } from './subcomponent';

const FontBlack = styled.span`
  color: #000;
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
    <BoxWrapper> 
      <WhiteWrapper><br/>
        <Subtitle><FontBlack><Bold>Login</Bold> to set your <Bold>alert preferences</Bold>!</FontBlack></Subtitle><br/>
        {/* <Select options={options} onChange={setary} width="2000px" defaultValue={ary} isMulti/><br/>{console.log(fav)} */}
        <form onSubmit={handleSubmit}>
          {/* <input type="hidden" onChange={console.log(fav)} value={fav}/> */}
          <StyledInput type="email" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/>
          <StyledInput type="password" onChange={(e) => setpassword(e.target.value)} placeholder="Your password"/>
          {/* <StyledInput type="password" onChange={(e) => setemail(e.target.value)} placeholder="Your email address"/> <br/> */}
          <Button />
        </form>
      </WhiteWrapper>
    </BoxWrapper>
  );
}

export default Login;