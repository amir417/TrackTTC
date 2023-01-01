import styled from 'styled-components';
import Select from "react-select";
import { useState } from "react";
import { useEffect } from 'react';
import { json } from 'react-router-dom';
import Title from "./subcomponent/Title.jsx";
import Subtitle from "./subcomponent/Subtitle.jsx";

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

const Account = () => {
  

  let favAry = [];
  const [fav, setfav] = useState('');
  const [ary, setary] = useState(null);
  const [email, setemail] = useState('');
  const [fname, setnamef] = useState('');
  const [lname, setnamel] = useState('');
  const [dbary, setDBary] = useState(null);
  const [newbus, setBus] = useState(true);


  useEffect(() => {
    
 
    fetch ('http://localhost:5000/account', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({token: window.localStorage.getItem("token")})
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userData.");
      if (data.status == "ok"){
        setemail(  data.data.email );
        setnamef(  data.data.fname );
        setnamel(  data.data.lname );
        setDBary (data.data.bus);
      }
      else {
        alert (data);
      }
      
    });
  }, []);




const handleSubmit = (e) => {
  e.preventDefault();
  const token = window.localStorage.getItem("token");
  const blog = { token, ary};
  console.log (JSON.stringify(blog));

  fetch ('http://localhost:5000/account', {
    method: 'PUT',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(blog)
  }).then((res) => res.json())
  .then((data) => {
    if (data.status == "ok"){
      alert ("Your preferences have been updated.");
      console.log (data.data);
      setDBary (data.data);
      console.log (dbary);
      
    }
    else {
      alert (data.status);
    }
  }
  )
 
}

  const options = [
    { value: 1, label: 'Subway 1' },
    { value: 2, label: 'Subway 2' },
    { value: 3, label: 'Subway 3' },
    { value: 4, label: 'Subway 4' }
  ]

  useEffect(() => {
    if (ary != null){
      if (ary.length == 0){
        setfav(null);
      }
      else {
        setfav(ary[0].label);
        for (let i = 1; i < ary.length; i++){
          setfav(fav + "," + ary[i].label);
        }
      }
    }
  }, [ary]);

  for (let i = 5; i <= 999; i++){
    options.push({value: i, label: 'Bus ' + i});
  }
 
  return (
    <SignUpWrapper> 
      <Subtitle> Choose/Change TTC and Bus lines you would like to receive emails:</Subtitle><br/>
      <Select options={options} onChange={setary} width="2000px" defaultValue={dbary} isMulti/><br/>
      <form onSubmit={handleSubmit}>
        <input type="hidden"  value={fav}/>
        <input type="submit" value="Submit"/>
      </form>
      <Subtitle>Your Email: {email} </Subtitle>
      <Subtitle>Your fullname: {fname} {lname} </Subtitle>

      <div>
        <Subtitle>You are currently subscribed to the following:</Subtitle> <br/>
          {dbary?.map((bus) => {
            return (
          <>
          <Subtitle id={bus.id}> {bus.label} </Subtitle>
          </>  
            )
          }
          )}
          <br/><br/><br/>
          <Subtitle>The following subscriptions of yours have an active alert:</Subtitle>
      </div>
    </SignUpWrapper>
  );
}

export default Account;