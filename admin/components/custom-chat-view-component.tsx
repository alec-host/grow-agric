import React,{FormEvent,useEffect,useState} from 'react';

import { Box,TextArea,Button,Table as AdminBroTable} from '@admin-bro/design-system';

import {ApiClient} from 'admin-bro';

import axios from 'axios';

import styles from './styles/component.style.js';

import images from './images/component.image.js';

import SearchBar from './searchcomponent/component.searchbar';

const CustomTableView  = (props:any) =>{

    const { resource } = props;

    const [mData, setData] = useState();
    const [mData1, setData1] = useState();

    useEffect(() =>{
        const getRecord = async(searchValue:any) => {
            const api = new ApiClient();
            const response = await api.resourceAction({
            resourceId:'chat_rooms',
            actionName:'list',
            baseURL:'http://localhost:8590/admin/',
            method:'GET',
            headers: { 'Content-Type': 'application/json',},
            });
            const json = await response.data.records;
            setData(json);
        };
        getRecord('none');
    },[]);

    const handleChatInit = (uuid:any) => {
        document.getElementById("uuid")!.value = uuid;
        localStorage.setItem('lsChatID',uuid);
        axios({
            method:'post',
            maxBodyLength:Infinity,
            url:'http://localhost:8590/getChatMessage',
            headers: {'Content-Type': 'application/json',},
            data: JSON.stringify({'farmer_uuid':uuid})
          })
          .then(function (response){
            const json = response.data.message;
            json.forEach((data:any) => {
                console.log(data);
            });
            setData1(json);
          });
    };

    const handleMessageSubmit = (event:FormEvent) => {
        const textAreaElement = document.getElementById("message");
        const inputTextElement = document.getElementById("uuid");
        if(textAreaElement?.value != "" && inputTextElement?.value != ""){
            axios({
                method:'post',
                maxBodyLength:Infinity,
                url:'http://localhost:8590/chat',
                headers: { 'Content-Type': 'application/json',},
                data: JSON.stringify({
                                        'farmer_uuid':inputTextElement?.value,
                                        'message':textAreaElement?.value,
                                        'message_origin': 1,
                                        'type': 'chat'
                                    })
              })
              .then(function (response){
                console.log(response);
                document.getElementById("message")!.value="";
                location.reload();
              });
        }else{
            alert('Field must be checked.');
        }
        event?.preventDefault();
    };

    useEffect(() =>{
        document.getElementById("uuid").value = localStorage.getItem('lsChatID');
        handleChatInit(localStorage.getItem('lsChatID'));
    },[]);

    console.log(images.FAVICON);
    return (
        <Box variant="grey">
            <Box flex>
                <Box width={1/3} style={{backgroundColor:'#e1fdaa',marginStart:'5px',border:'1px solid #c0c0ca'}}>
                    <AdminBroTable>
                        <thead>
                            <tr style={{textAlign:'left'}}>
                            {resource.listProperties.map((property:any) => (
                            <th key={1}>{ property.label}</th>
                            ))}
                            </tr>
                        </thead> 
                        <tbody><tr><td><SearchBar/></td></tr></tbody>
                        <tbody>
                                <tr><td><small>&nbsp;</small></td></tr>
                                {mData?.map((element:any) => (
                                        <tr key={element.params._id} style={{height:'30px'}} onClick={() => handleChatInit(element.params.farmer_uuid)}>
                                            <td style={{fontFamily:'fantasy',fontSize:'18px',margin:'15px',cursor:'pointer'}}>
                                                <img src={images.FAVICON}/>&nbsp;{element.params.full_name}
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td></td>
                                </tr>
                        </tbody>
                    </AdminBroTable>
                </Box>
                <Box width={2/3} flexShrink={1} style={{marginLeft:'5px',marginRight:'5px'}}> 
                    <Box id="scrollBox" flexGrow={1} style={styles.boxStyle}>
                        <AdminBroTable style={{minHeight:'50vh'}}>
                            <tbody>
                                <tr><td style={{height:'10px'}}></td></tr>
                                {mData1?.map((item:any) => (
                                    <>
                                    <tr>
                                        <td><span style={styles.spanTimeStyle}>{item?.createdAt?.replace(/T.*Z/, '')}</span></td>
                                    </tr>
                                    <tr key={item?._id} style={{ height: '30px' }}>
                                        {item.message_origin == 1 ?
                                            <td style={styles.bubbleOutlineStartStyle}>
                                                <span style={styles.bubbleInStyle}>{item.message}</span>
                                            </td> :
                                            <td style={styles.bubbleOutlineEndStyle}>
                                                <span style={styles.bubbleOutStyle}>{item.message}</span>
                                            </td>}
                                    </tr>
                                    </>
                                ))}
                                <tr><td style={{height:'10px'}}></td></tr>
                            </tbody>
                        </AdminBroTable>
                    </Box>
                    <form id="mForm" method="dialog" onSubmit={handleMessageSubmit}>
                        <Box>
                            <TextArea 
                                id="message" 
                                name="message" 
                                placeholder="message"
                                style={{marginBottom:'10px'}}
                                width={1}
                                rows="4" 
                            required/>
                            <input type='hidden' id='uuid' name='uuid' />
                        </Box>
                        <Box><Button id="buttonSend" variant="primary">Send</Button></Box>
                    </form>
                </Box>
            </Box>
      </Box>   
    );
};

export default CustomTableView;