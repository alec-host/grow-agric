import React, { FormEvent, useEffect,useState } from 'react';

import { Box, Header, Button, Icon, Input, Label, Section, SmallText, DatePicker } from '@admin-bro/design-system';

import { ActionProps } from 'admin-bro';
import { ApiClient } from 'admin-bro';

import axios from 'axios';


const UpdateSalesRecordAction = (props : ActionProps) => {
  const { record } = props;
  const data=record?.params;

  console.log("zip zipa "+data._id);

  const [startDate, setStartDate] = useState(new Date());

  //-.get farmers details.
  /*
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
*/
  const handleOnSubmit = (event:FormEvent) => {
    const inputPurchaseDateText = document.getElementById("purchase_date");//purchase_date
    const inputPriceText = document.getElementById("purchase_price");
    const inputQuantityText =  document.getElementById("quantity");
    const serverMessage = document.getElementById("server_message");

    if(inputPriceText.value == "" || inputQuantityText.value == "") {
        serverMessage.textContent="";
        event.preventDefault();
    }else{
        /*
        const formData = new FormData();
        const definedURL = 'http://localhost:8590/admin/api/resources/Sales/records/' + data._id + '/edit';

        formData.append('application_status','0');  
        axios({
            method:'post',
            maxBodyLength:Infinity,
            url:definedURL,
            data:formData
        })
        .then(function (response) {
            serverMessage.textContent=response.data.notice.message;
            console.log(response.data.notice);
        });
        */
        event.preventDefault();
    }
  };
  const FormUpdateSalesRecord = () => {
    return (
      <Box>
        <form id="mForm" method="dialog" onSubmit={handleOnSubmit}>
        <Box flexShrink={0}>
          <Section>
            <div style={{height:"10px"}}/>
            <Box>
                <Label htmlFor="purchase_date">Pick purchase date</Label>
                <DatePicker dateFormat="MM-DD-YYYY" id="purchase_date" name="purchase_date" selected={new Date()} onChange={(date) => setStartDate(date)} />
            </Box>
            <Label htmlFor="purchase_price">Price bought</Label>
            <Input id="purchase_price" name="purchase_price" width={1/2} required />
            <Label htmlFor="quantity">Quantity bought</Label>
            <Input id="quantity" name="quantity" width={1/2} required />               
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
      <Box variant="white" width={1} boxShadow="card" mr="xxl" flexShrink={0}>
        <SmallText><span id="server_message" style={{color:"red",fontSize:"12px",fontWeight:"bolder"}}></span></SmallText>
        <Section>
          <Box variant="card">
            <span style={{ fontWeight:'bold',fontFamily:'calibri',fontSize:'40px',color:'GrayText' }}><span id="names">{data.names}</span></span>
          </Box>
        </Section>
        <div style={{background:"GrayText",height:"1px"}}
        />
        <Box pb="x4"><FormUpdateSalesRecord/></Box>
      </Box>
    </Box>
  )
};

export default UpdateSalesRecordAction