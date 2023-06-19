import React, { FormEvent, useEffect } from 'react';

import { Box, Header, Button, Icon, TextArea, Label, Section,SmallText } from '@admin-bro/design-system';

import { ActionProps } from 'admin-bro';
import { ApiClient } from 'admin-bro';

import axios from 'axios';

const LoanReviewAction = (props : ActionProps) => {
  const { record } = props;
  const data=record?.params;

  console.log("zip zipa "+data._id);

  //-.get farmers details.
  useEffect(() => {
        const api = new ApiClient();
        api.resourceAction({
          resourceId:'farmers',
          actionName:'list',
          baseURL:'http://localhost:8590/admin/',
          method:'GET',
          query:'?filters.phone_number=' + data.phone_number,
        }).then(results => {
          const spanFirstname = document.getElementById('fname');
          spanFirstname.textContent = results.data.records[0].params.first_name;
          const spanLastname = document.getElementById('lname');
          spanLastname.textContent = results.data.records[0].params.last_name;
          const spanUUID = document.getElementById('uuid');
          spanUUID.textContent = results.data.records[0].params.farmer_uuid;
          const spanMarried = document.getElementById('married');
          spanMarried.textContent = results.data.records[0].params.is_married;
          const spanAge = document.getElementById('age');
          spanAge.textContent = results.data.records[0].params.age? 0: 'Not_provided';
          const spanExperience = document.getElementById('exp');
          spanExperience.textContent = results.data.records[0].params.year_of_experience? 0: 'Not_provided';
        })
        .catch(err =>{
          console.log("error:");
        });
  },[]);

  const handleOnSubmit = (event:FormEvent) => {
    const inputReasonText = document.getElementById("message");
    const inputRecordText =  document.getElementById("record");
    const radioOptionText = document.querySelector( 'input[name="optionReview"]:checked');
    const serverMessage = document.getElementById("server_message");

    if(inputReasonText.value == "" || inputRecordText.value == "") {
     inputReasonText?.focus();
     serverMessage.textContent="";
     event.preventDefault();
    }else{
      const formData = new FormData();
      const definedURL = 'http://localhost:8590/admin/api/resources/Applicants/records/' + data._id + '/edit';
      
      formData.append('application_status',radioOptionText.value);  
      axios({
        method:'post',
        maxBodyLength:Infinity,
        url:definedURL,
        data:formData
      })
      .then(function (response) {
        const checkedOpt = document.getElementsByName("optionReview");
        for(let i=0;i<checkedOpt.length;i++) {
          checkedOpt[i].checked = false;
        }
        serverMessage.textContent=response.data.notice.message;
        console.log(response.data.notice);
      });
      inputReasonText.value = "";
      event.preventDefault();
    }
  };
  const FormFinanceApplicationReview = () => {
    return (
      <Box>
        <form id="mForm" method="dialog" onSubmit={handleOnSubmit}>
        <Box flexShrink={0}>
          <Section>
            <span style={{fontSize:"13px"}}>Select application review status:</span>
            <div style={{height:"10px"}}/>
            <Box variant="grey" style={{padding:"5px"}}>
              <Label htmlFor="decline">
                <input type="radio" name="optionReview" style={{accentColor:"#9d3039",height:"20px",width:"20px"}} value="DECLINED"/>
                <span style={{"color":"red",fontWeight:"bold",verticalAlign:"super"}}>DECLINE</span>
              </Label>
              <Label htmlFor="approve">
                <input type="radio" name="optionReview" style={{accentColor:"#9d3039",height:"20px",width:"20px"}} value="APPROVED"/>
                <span style={{"color":"green",fontWeight:"bold",verticalAlign:"super"}}>APPROVE</span>
              </Label>
            </Box>
            <div style={{height:"10px"}}/>
            <Label htmlFor="message">
              <span style={{fontSize:"13px"}}>
                Remark for <span style={{fontWeight:"lighter"}}>Decline</span>&nbsp;or&nbsp;<span style={{fontWeight:"lighter"}}>Approval</span>
              </span>
            </Label>
            <TextArea
              id="message"
              name="message"
              fontsize="lg"
              rows={6} 
              cols={50}
              placeholder="Type remark."
              required
              />
            <p><input type="hidden" id="record" name="record" value={data._id} /></p>
          </Section>
          </Box>
          <br/>
          <Box flexGrow={0} style={{textAlign:"right"}}>
            <Button form="mForm" name="submit" variant="success" mr="default">SUBMIT</Button>
          </Box>
        </form>
      </Box>
    )
  };

  return (
    <Box flex>
      <Box variant="white" width={1/2} boxShadow="card" mr="xxl" flexShrink={0}>
        <Header.H3>Example of a simple page</Header.H3>
        <p>Where you can put almost everything</p>
        <p>like this:</p>
        <p>
          <img src="https://i.redd.it/rd39yuiy9ns21.jpg" alt="stupid cat" width={300} />
        </p>
      </Box>
      <Box variant="white" width={1/2} boxShadow="card" mr="xxl" flexShrink={0}>
        <SmallText><span id="server_message" style={{color:"red",fontSize:"12px",fontWeight:"bolder"}}></span></SmallText>
        <Section>
          <Box variant="card">
            <span style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '20px', color: 'GrayText'}}><span id="fname"></span></span>
            <span style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '40px' }}><span id="lname"></span></span>
            <p>&nbsp;</p>
            <p><span style={{fontSize:'13px'}}><Icon icon="User"/> <span id="uuid"></span></span></p>
            <p><span style={{fontSize:'13px'}}><Icon icon="Phone"/> {data.phone_number}</span></p>
            <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> <span id="married"></span></span></p>
            <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> <span id="age"></span></span></p>
            <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> <span id="exp"></span></span></p>
          </Box>
        </Section>
        <div style={{background:"GrayText",height:"1px"}}
        />
        <Box pb="x4"><FormFinanceApplicationReview/></Box>
      </Box>
    </Box>
  )
};

export default LoanReviewAction