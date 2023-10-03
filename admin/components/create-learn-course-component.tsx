import React,{FormEvent,useEffect} from 'react';

import { Box,Label,Input,TextArea,Button,DropZone} from '@admin-bro/design-system';

import {ApiClient} from 'admin-bro';

import axios from 'axios';

const CustomCreateLearnModuleView  = (props:any) =>{

    const { handleChange } = props;

    const maxSize = 1024 * 3000;
    const mimeTypes = ['application/pdf'];

    let mFile:any = null;

    useEffect(() =>{
        const api = new ApiClient();
        api.resourceAction({
        resourceId:'learning_modules',
        actionName:'list',
        baseURL:'http://localhost:8590/admin/',
        method:'GET',
        headers: { 'Content-Type': 'application/json',},
        }).then(results => {
            const record = results.data.records;
            const selectElement = document.getElementById('module_uuid');
            record.forEach((option:any) => {
                console.log(option.params.module_uuid);
                const optionElement = document.createElement('option');
                optionElement.style.fontFamily = "'Roboto',sans-serif";
                optionElement.value = option.params.module_uuid;
                optionElement.textContent = option.params.topic;
                selectElement?.appendChild(optionElement);
            });
        })
        .catch(err =>{
            console.log("error:     "+err);
        });
    },[]);

    const onUpload = (files:FileList) => { 
        alert(files.length ? files[0].name : 'no files selected' );

        mFile = files;

        document.getElementById("file_name").value=files[0].name;
        document.getElementById("file_size").value=files[0].size;
        document.getElementById("file_type").value=files[0].type;

        console.log(files[0].size);

        event.preventDefault();
    };

    const handleOnSubmit = (event:FormEvent) => {

        const module_uuid = document.getElementById("module_uuid");
        const course_name = document.getElementById("course_name");
        const description = document.getElementById("description");
        const file_name   = document.getElementById("file_name");
        const file_size   = document.getElementById("file_size");
        const file_type   = document.getElementById("file_type");

        const formData = new FormData();

        formData.append('module_uuid',module_uuid.value);
        formData.append('course_name',course_name.value);
        formData.append('description',description.value);
        formData.append('file_name',file_name.value);
        formData.append('file_size',file_size.value);
        formData.append('file_type',file_type.value);
        formData.append('record_id','0');
        formData.append('file',mFile[0]);

        axios({
            method:'POST',
            maxBodyLength:Infinity,
            url:'http://localhost:8590/addCourse',
            headers: { 'Content-Type': 'application/json',},
            data: formData
          })
          .then(function (response) {
            document.getElementById("module_uuid").value="";
            document.getElementById("course_name").value="";
            document.getElementById("description").value="";
            document.getElementById("file_name").value="";
            document.getElementById("file_size").value="";
            document.getElementById("file_type").value="";

            console.log(response);
          });

        event.preventDefault();
    };

    return (
        <Box variant="grey">
        {/* Customize the form layout and fields here */}
        <form id="mForm" method="dialog" encType="multipart/form-data" onSubmit={handleOnSubmit}>
            <Label htmlFor='module_uuid' style={{fontFamily: "'Roboto',sans-serif",fontSize:'14px',paddingTop:'5px',paddingBottom:'6px'}}>Module name</Label>
            <select id="module_uuid" name="module_uuid" style={{minWidth:'0px',width:'100%',marginBottom:'6px',height:'30px'}} required>
                <option value='' style={{fontFamily: "'Roboto',sans-serif"}}>SELECT MODULE</option>
            </select>
            <Label htmlFor='name' style={{fontFamily: "'Roboto',sans-serif",fontSize:'14px',paddingTop:'5px',paddingBottom:'6px'}}>Course name</Label>
            <Input
            type="text"
            id="course_name"
            name="course_name"
            style={{minWidth:'0px',width:'100%',marginBottom:'6px'}}
            placeholder="Course name*"
            onChange={handleChange}
            required/>
            <Label htmlFor="description" style={{fontFamily: "'Roboto',sans-serif",fontSize:'14px',paddingTop:'5px',paddingBottom:'6px'}}>Course description</Label>
            <TextArea 
                id="description" 
                name="description" 
                placeholder="description*"
                style={{marginBottom:'10px'}}
                width={1/2}
                rows="5" 
                required/>
            <DropZone
                onChange={onUpload}
                validate= { { maxSize, mimeTypes } } />
            <Input id="file_name" type="hidden" required/>
            <Input id="file_size" type="hidden" required/>
            <Input id="file_type" type="hidden" required/>
            <Box>
                <Button  mb="default" variant="primary" mr="default" style={{marginTop:'10px'}}>Add course</Button>
            </Box> 
        </form> 
        {/* Add other fields as needed */}
      </Box>
    );
};

export default CustomCreateLearnModuleView;