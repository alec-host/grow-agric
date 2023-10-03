import React,{FormEvent,useEffect} from 'react';

import { Box,Label,Input,TextArea,Button,DropZone} from '@admin-bro/design-system';

import {ApiClient} from 'admin-bro';

import axios from 'axios';

const CustomCreateLearnModuleView  = (props:any) =>{

    const { record,handleChange } = props;

    const maxSize = 1024 * 3000;
    const mimeTypes = ['application/pdf'];

    let mFile:any = null;

    console.log(record.params.module_uuid);

    useEffect(() =>{     
        const definedURL = "http://localhost:8590/admin/api/resources/learning_modules/actions/list?filters.module_uuid=" +  record.params.module_uuid;
        axios({
          method:'GET',
          maxBodyLength:Infinity,
          url:definedURL
        }).then(results => {
            const buttonElement = document.getElementById('btnManage');
            const selectElement = document.getElementById('module_uuid');
            const optionElement = document.createElement('option');
            optionElement.value = record.params.module_uuid;
            if(results.data.records[0] != null){
                optionElement.textContent = results.data.records[0].params.topic;
            }else{
                optionElement.textContent = 'SELECT MODULE';
            }
            selectElement?.appendChild(optionElement);
            optionElement.selected = true;
            document.getElementById("course_name").value=record.params.course_name;
            document.getElementById("description").value=record.params.description;
            if(record.params.is_deleted == 1){
                buttonElement.textContent = 'Publish';
            }else{
                buttonElement.textContent = 'Unpublish';
            }
        }) 
    },[]);

    useEffect(() =>{
        const api = new ApiClient();
        api.resourceAction({
        resourceId:'learning_modules',
        actionName:'list',
        baseURL:'http://localhost:8590/admin/',
        method:'GET',
        headers: {'Content-Type': 'application/json'},
        }).then(results => {
            const record = results.data.records;
            const selectElement = document.getElementById('module_uuid');
            record.forEach((option:any) => {
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

        event.preventDefault();
    };

    const handleOnSubmit = (event:FormEvent) => {

        const module_uuid = document.getElementById("module_uuid");
        const course_name = document.getElementById("course_name");
        const description = document.getElementById("description");
        //const file_name   = document.getElementById("file_name");
        //const file_size   = document.getElementById("file_size");
        //const file_type   = document.getElementById("file_type");

        let data = JSON.stringify({
            "module_uuid": module_uuid.value,
            "course_name": course_name.value,
            "description": description.value,
            "record_id": record.params._id
          });
        axios({
            method:'post',
            maxBodyLength:Infinity,
            url:'http://localhost:8590/modifyCourse',
            headers: { 'Content-Type': 'application/json',},
            data: data
          })
          .then(function (response) {
            document.getElementById("module_uuid").value="";
            document.getElementById("course_name").value="";
            document.getElementById("description").value="";
            //document.getElementById("file_name").value="";
            //document.getElementById("file_size").value="";
            //document.getElementById("file_type").value="";
          });

        event.preventDefault();
    };

    const handleContentManagement = () => {
        let mvalue;
        const buttonElement = document.getElementById("btnManage");
        buttonElement.disabled = true;
        if(record.params.is_deleted == 1){
            mvalue = 0;
        }else{
            mvalue = 1;
        }
        let data = JSON.stringify({
            "is_deleted": mvalue,
            "record_id": record.params._id
          });
        axios({
            method:'post',
            maxBodyLength:Infinity,
            url:'http://localhost:8590/modifyCourse',
            headers: { 'Content-Type': 'application/json',},
            data: data
          })
          .then(function (response){
            location.reload();
          });
        //event.preventDefault();
        setTimeout(function () {
            buttonElement.disabled = false;
        }, 5000); 

    };

    return (
        <Box id="myContainer" variant="grey">
        {/* Customize the form layout and fields here */}
        <form id="mForm" method="dialog" encType="multipart/form-data" onSubmit={handleOnSubmit}>
            <Label htmlFor='module_uuid' style={{fontFamily: "'Roboto',sans-serif",fontSize:'14px',paddingTop:'5px',paddingBottom:'6px'}}>Module name</Label>
            <select id="module_uuid" name="module_uuid" style={{minWidth:'0px',width:'100%',marginBottom:'6px',height:'30px'}} required>
                <option value='' style={{fontFamily: "'Roboto',sans-serif"}}></option>
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
            {
             /*
            <DropZone
                onChange={onUpload}
                validate= { { maxSize, mimeTypes } } />
            */
            }
            <Input id="file_name" type="hidden" value='0'/>
            <Input id="file_size" type="hidden" value='0'/>
            <Input id="file_type" type="hidden" value='0'/>
            <Box>
                <Button mb="default" variant="primary" mr="default" style={{marginTop:'10px'}}>Save</Button>
            </Box> 
        </form>
        <Button id="btnManage" mb="default" variant="danger" mr="default" style={{marginTop:'10px'}} onClick={handleContentManagement}>Unpublish</Button>
        {/* Add other fields as needed */}
      </Box>
    );
};

export default CustomCreateLearnModuleView;