import { Box, Header, Button, Icon, TextArea, Label, Section, SmallText, Badge,Input } from '@admin-bro/design-system';
import { ActionProps } from 'admin-bro';
import React,{FormEvent} from 'react';
import { ApiClient } from 'admin-bro';
/*
import axios from 'axios';
*/
const CreateNewUserAction = (props : ActionProps) => {
    const handleOnSubmit = (event:FormEvent) => {
        const inputFname = document.getElementById("first_name");
        const inputLname = document.getElementById("last_name");
        const inputEmail = document.getElementById("email");
        const inputRole  = document.getElementById("role");
        const inputPass  = document.getElementById("password");
        if(inputFname.value == "" || inputLname.value == "" || inputEmail.value == "" || inputRole.value == ""){
            event.preventDefault();
        }else{
            const api = new ApiClient();
            api.resourceAction({
            resourceId:'portal_users',
            actionName:'new',
            baseURL:'http://localhost:8590/admin/',
            method:'POST',
            headers: { 'Content-Type': 'application/json',},
            data: JSON.stringify({first_name:inputFname.value,last_name:inputLname.value,email:inputEmail.value,role:inputRole.value,password:inputPass.value}),
            }).then(results => {
                console.log(results);
                inputFname.value="";
                inputLname.value=""
                inputEmail.value="";
                inputRole.value="";
                inputPass.value="";
            })
            .catch(err =>{
            console.log("error:     "+err);
            });
            console.log("saving the data onto the db");
            event.preventDefault();
        }
    };
    
    return(
        <Box flex width={1} mr="xxl" flexShrink={1}>
                <Box variant="white" flexGrow={1}>
                    <form id="mForm" method="dialog" onSubmit={handleOnSubmit}>
                        <Label htmlFor="first_name"><span style={{color:"royalblue"}}>*&nbsp;</span>First Name</Label>
                        <Input id="first_name" name="first_name" width={1} placeholder="" required/>
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="last_name"><span style={{color:"royalblue"}}>*&nbsp;</span>Last Name</Label>
                        <Input id="last_name" name="last_name" width={1} placeholder="" required/>
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="last_name"><span style={{color:"royalblue"}}>*&nbsp;</span>Email</Label>
                        <Input id="email" name="email" width={1} placeholder="" required/>
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="role"><span style={{color:"royalblue"}}>*&nbsp;</span>Role</Label>
                        <Input id="role" name="role" width={1} placeholder="" required/>
                        <div style={{background:"white",height:"20px"}}/>
                        <Label htmlFor="password"><span style={{color:"royalblue"}}>*&nbsp;</span>Password</Label>
                        <Input id="password" name="password" width={1} placeholder="" required/>                        
                        <div style={{background:"white",height:"20px"}}/>
                        <Box style={{textAlign:"right"}}>
                            <Button style={{margin:"0px"}} form="mForm" name="submit" variant="primary" mr="default">Save</Button>
                        </Box>
                    </form>
                </Box>
        </Box>

    )
};


export default CreateNewUserAction;