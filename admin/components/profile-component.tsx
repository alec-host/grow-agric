import { Box, Header, Button, Icon, Text, Label, Section, Input, SmallText } from '@admin-bro/design-system';
import { ActionProps } from 'admin-bro';
import React,{FormEvent,useEffect} from 'react';

import axios from 'axios';
//import { encrypt } from '../../app/services/crypto';

const UserProfileAction = (props : ActionProps) => {

    const { resource } = props;
    
    const myURL = 'http://localhost:8590/admin/api/resources/'+resource.id+'/actions/list?'+resource.href?.toString().split('?')[1];

    useEffect(() => {  
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: myURL,
          };
          axios.request(config)
          .then((response) => {
            //console.log(JSON.stringify(response.data));
            //console.log(JSON.stringify(response));
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXX '+response.data.records[0].params.first_name);
            const textFname = document.getElementById('first_name');
            textFname.textContent = response.data.records[0].params.first_name;
            const textLname = document.getElementById('last_name');
            textLname.textContent = response.data.records[0].params.last_name;
            const textEmail = document.getElementById('email');
            textEmail.textContent = response.data.records[0].params.email;
            const textRole = document.getElementById('role');
            textRole.textContent = response.data.records[0].params.role;
            const textRecord = document.getElementById('record');
            textRecord.value = response.data.records[0].params._id;
          })
          .catch((error) => {
            console.log(error);
          });
    },[]);

    const handleOnSubmit = (event:FormEvent) => {
        const pass1  = document.getElementById("password");
        const pass2  = document.getElementById("confirm_password");
        const record = document.getElementById("record");
        const message = document.getElementById("message");
        if(pass1.value == "" || pass2.value == ""){
            event.preventDefault();
        }else if(pass1.value != pass2.value){
            message.textContent = "Mismatching password";
            event.preventDefault();
        }else{
            const formData = new FormData();
            const definedURL = 'http://localhost:8590/admin/api/resources/' + resource.id +'/records/' + record.value + '/edit';
            formData.append('password',pass1.value);
            axios({
                method:'post',
                maxBodyLength:Infinity,
                url:definedURL,
                data:formData
              })
              .then(function (response) {
                message.textContent=response.data.notice.message;
                console.log(response.data.notice);
              });
            console.log("saving the data onto the db");
            event.preventDefault();
        }
    };
    
    return(
        <Box flex width={1} mr="xxl" flexShrink={1}>
            <Box variant="white" flexGrow={1}>
                <Box variant="white" boxShadow="card" flexShrink={1}>
                    <Label htmlFor="first_name"><Icon icon="User"/>First Name</Label>
                    <Text id="first_name" name="first_name" style={{color:"gray",fontWeight:"bold"}} width={1}/>
                    <div style={{background:"white",height:"20px"}}/>
                    <Label htmlFor="last_name"><Icon icon="User"/>Last Name</Label>
                    <Text id="last_name" name="last_name" style={{color:"gray",fontWeight:"bold"}} width={1}/>
                    <div style={{background:"white",height:"20px"}}/>
                    <Label htmlFor="last_name"><Icon icon="Email"/>Email</Label>
                    <Text id="email" name="email" style={{color:"gray",fontWeight:"bold"}} width={1} />
                    <div style={{background:"white",height:"20px"}}/>
                    <Label htmlFor="role"><Icon icon="Role"/>Role</Label>
                    <Text id="role" name="role" style={{color:"gray",fontWeight:"bold"}} width={1} />
                    <input type="hidden" id="record" name="record"/>
                </Box>
                <Box flex style={{marginTop:'5px',marginBottom:'5px'}}>
                    <span style={{fontSize:"13px",fontFamily:"Roboto',sans-serif"}}>Change Password</span>:</Box>
                    <div style={{background:"GrayText",height:"1px"}}/>
                <Section>
                    <SmallText><span id="message" style={{color:"red",fontSize:"12px",fontWeight:"bolder"}}></span></SmallText>
                    <div style={{background:"white",height:"5px"}}/> 
                    <form id="mForm" method="dialog" onSubmit={handleOnSubmit}>
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="password">New Password</Label>
                        <Input type="password" id="password" name="password" width={1} required/>                        
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input type="password" id="confirm_password" name="confirm_password" width={1} required/>  
                        <div style={{background:"white",height:"20px"}}/>                       
                        <Box style={{textAlign:"right"}}>
                            <Button style={{margin:"0px"}} form="mForm" name="submit" variant="primary" mr="default">Save</Button>
                        </Box>
                    </form>
                </Section>
            </Box>
        </Box>
    )
};


export default UserProfileAction;