import { Box, Header, Button, Icon, Text, Label, Section, Input, SmallText } from '@admin-bro/design-system';
import { ActionProps } from 'admin-bro';
import {ApiClient} from 'admin-bro';

import React,{FormEvent,useEffect} from 'react';

import axios from 'axios';


const Dashboard = (props : ActionProps) => {

    useEffect(() =>{
        const api = new ApiClient();
        api.resourceAction({
        resourceId:'farmers',
        actionName:'list',
        baseURL:'http://localhost:8590/admin/',
        method:'GET',
        headers: { 'Content-Type': 'application/json',},
        }).then(results => {
            const farmers = document.getElementById('farmers');
            farmers.textContent = results.data.meta.total;
            console.log(results.data.meta.total);
    
        })
        .catch(err =>{
        console.log("error:     "+err);
        });
    },[]);

    useEffect(() =>{
        const api = new ApiClient();
        api.resourceAction({
        resourceId:'farms',
        actionName:'list',
        baseURL:'http://localhost:8590/admin/',
        method:'GET',
        headers: { 'Content-Type': 'application/json',},
        }).then(results => {
            const farms = document.getElementById('farms');
            farms.textContent = results.data.meta.total;
            console.log(results.data.meta.total);
    
        })
        .catch(err =>{
        console.log("error:     "+err);
        });
    },[]);

    useEffect(() =>{
        const api = new ApiClient();
        api.resourceAction({
        resourceId:'finance_applications',
        actionName:'list',
        baseURL:'http://localhost:8590/admin/',
        method:'GET',
        headers: { 'Content-Type': 'application/json',},
        }).then(results => {
            const allFinancialRequests = document.getElementById('allFinancialRequests');
            allFinancialRequests.textContent = results.data.meta.total;
            console.log(results.data.meta.total);
    
        })
        .catch(err =>{
        console.log("error:     "+err);
        });
    },[]);    

    return (
        <Box style={{textAlign:'center',padding:'0px'}}>
            <Box flex>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1}>
                    <Box variant="card" width="35vh" boxShadow="card" mr="xl"  flexShrink={1} height="35vh">
                        <Section>
                        Total Farmers
                        </Section><br/><br/><br/><br/>
                        <Box style={{textAlign:'center'}}>
                            <span id="farmers"  style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '80px', color: 'GrayText'}}>0</span>
                        </Box>
                    </Box>
                </Box>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1}>
                    <Box variant="card" width="35vh" boxShadow="card" mr="xl"  flexShrink={1} height="35vh">
                        <Section>
                        Registered Farms
                        </Section><br/><br/><br/><br/>
                        <Box style={{textAlign:'center',padding:'0px'}}>
                            <span id="farms"  style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '80px', color: 'GrayText'}}>0</span>
                        </Box>
                    </Box>
                </Box>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1}>
                    <Box variant="card"width="35vh" boxShadow="card" mr="xl"  flexShrink={1} height="35vh">
                        <Section>
                            Total Financial Request
                        </Section><br/><br/><br/><br/>
                        <Box style={{textAlign:'center'}}>
                            <span id="allFinancialRequests"  style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '80px', color: 'GrayText'}}>0</span>
                        </Box>                        
                    </Box>
                </Box>
            </Box> 
            <Box flex>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1}>
                    <Box variant="card" width="35vh" boxShadow="card" mr="xl" flexShrink={1} height="35vh">
                        <Section>
                            <Box>
                            </Box>
                        </Section>
                    </Box>
                </Box>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1} >
                    <Box variant="card" width="35vh" boxShadow="card" mr="xl" flexShrink={1} height="35vh">
                        <Section>
                            <Box>
                            </Box>
                        </Section>
                    </Box>
                </Box>
                <Box variant="grey" width={1/2}  mr="xxl" flexShrink={1}>
                    <Box variant="card" width="35vh" boxShadow="card" mr="xl" flexShrink={1} height="35vh">
                        <Section>
                            <Box>
                            </Box>
                        </Section>
                    </Box>
                </Box>
            </Box>                         
        </Box> 
      )

};

export default Dashboard;