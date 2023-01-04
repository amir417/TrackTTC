import styled from 'styled-components';
import Select from "react-select";
import { useState, Link } from "react";
import { useEffect } from 'react';
import { json } from 'react-router-dom';
import Subtitle from "./subcomponent/Subtitle.jsx";
import { BoxWrapper, Button } from './SubmitBoxStyles';
import { Bold } from './subcomponent';
import {TiDelete} from "react-icons/ti"


const FontBlack = styled.span`
  color: #000;
`;

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;  
  margin: 0 5vw;
  max-width: 150rem;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 8vh 0 5vh 0;
  min-height: 60vh;
`

const SelectWrapper = styled.div`
  width: 70%;
  margin: auto;
`

const Account = () => {
  let favAry = [];
  const [fav, setfav] = useState('');
  const [ary, setary] = useState(null);
  const [email, setemail] = useState('');
  const [fname, setnamef] = useState('');
  const [lname, setnamel] = useState('');
  const [dbary, setDBary] = useState(null);
  const [delBus, setBus] = useState('');

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
    const blog = {token, ary};
    console.log(JSON.stringify(blog));

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
  const handleDel = (e) => {
    // e.preventDefault();
    setBus(e);
    const bus = delBus;
    const token = window.localStorage.getItem("token");
    console.log (token, bus);
    const blog = {token, bus}
    console.log (blog)
    console.log (JSON.stringify(blog));
    fetch ('http://localhost:5000/account', {
      method: 'DELETE',
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
          setfav(fav + "," + ary[i].label); {/*bus numbers go from 7 to 499 and then from 900 to 999
        streecars only have 500 line (500-600). subway only 1-4*/ }
        }
      }
    }
  }, [ary]);

  for (let i = 5; i <= 999; i++){
    options.push({value: i, label: 'Bus ' + i});
  }
 
  return (
    <BoxWrapper> 
      <Dashboard>
        <Subtitle>
          <FontBlack>
            <Bold>Choose/Change TTC</Bold> and <Bold>Bus</Bold> lines (up to 50) you would like to receive <Bold>emails</Bold>:
          </FontBlack>
        </Subtitle><br/>

        <SelectWrapper>
          <Select options={options} onChange={setary} autosize={true} defaultValue={dbary} isMulti/><br/>
        </SelectWrapper>
        
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={fav}/>
          <Button/>
        </form>
        <Subtitle>Your Email Address: {email} </Subtitle>
        <Subtitle>Your Full Name: {fname} {lname} </Subtitle>
        <div>
          <Subtitle><FontBlack>You are currently <Bold>subscribed</Bold> to the following:</FontBlack></Subtitle><br/>
            {dbary?.map((bus) => {
              return (
                <>
                  <Subtitle id={bus.id}>
                    <FontBlack> 
                      <Bold>{bus.label}</Bold> <button type='button' onClick={()=>handleDel(bus.label)} ><TiDelete/></button> 
                    </FontBlack>
                  </Subtitle>
                </>  
              )
            })}
            <br/><br/><br/>
            <Subtitle><FontBlack>The following subscriptions of yours have an active alert:</FontBlack></Subtitle>
        </div>
      </Dashboard>
    </BoxWrapper>
  );
}

export default Account;