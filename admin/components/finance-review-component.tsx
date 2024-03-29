import React, { FormEvent, useEffect ,useState} from 'react';

import { Box, Header, Button, Icon, TextArea, Label, Section, SmallText, Badge } from '@admin-bro/design-system';

import { ActionProps,ApiClient,useCurrentAdmin } from 'admin-bro';


import { Stepper } from 'react-form-stepper';

import axios from 'axios';

const LoanReviewAction = (props : ActionProps) => {

  const currentAdmin = useCurrentAdmin();
  const { record,resource } = props;
  const data=record?.params;
  
  const stepCnt = resource.href?.includes('?') ?? resource.href?.split('&')[1].replace('step=','').trim();

    //const stepCnt = resource.href?.includes('?') ?? resource.href?.split('&')[1].replace('step=','').trim();

  const steps = [{label:'Stage 1: Pending Review'}, 
                 {label:'Stage 2: In Review'},
                 {label:'Stage 3: Finalizing'},
                 {label:'Stage 4: PO. Completed'},
                 {label:'Stage 5: Loan Approved'},
                 {label:'Stage 6: Farm to Start'},
                 {label:'Stage 7: Farming Starts'}]; 
  
  useEffect(() =>{
    const definedURL = "http://localhost:8590/admin/api/resources/farms/actions/list?filters.farmer_uuid=" +  data.farmer_uuid;
    axios({
      method:'GET',
      maxBodyLength:Infinity,
      url:definedURL
    }).then(results => {
      const itemFarmed = document.getElementById('item_farmed');
      itemFarmed.textContent = results.data.records[0].params.item_farmed != null ? results.data.records[0].params.item_farmed: "Nil";
      const location = document.getElementById('location');
      location.textContent = results.data.records[0].params.county+' '+results.data.records[0].params.sub_county +' '+ results.data.records[0].params.ward;
      const spanMortality_rate = document.getElementById('mortality_rate');
      spanMortality_rate.textContent = results.data.records[0].params.mortality_rate;
      const spanHasInsurance = document.getElementById('has_insurance');
      spanHasInsurance.textContent = results.data.records[0].params.is_insured ? 0: 'No';
      const spanProvider = document.getElementById('provider');
      spanProvider.textContent = results.data.records[0].params.insurer != "0" ? results.data.records[0].params.insurer : 'None';
      const spanEmployeeCnt = document.getElementById('employee_count');
      spanEmployeeCnt.textContent = results.data.records[0].params.number_of_employees;
      const spanHouseCapacity = document.getElementById('house_capacity');
      spanHouseCapacity.textContent = results.data.records[0].params.bird_house_capacity.toLocaleString();
      const spanExperience = document.getElementById('exp');
      spanExperience.textContent = results.data.records[0].params.number_of_years_farming > 0 ? " (farming "+ results.data.records[0].params.item_farmed + ") : " + results.data.records[0].params.number_of_years_farming : 'Not_provided';
    })
  },[]);

  //-.get farmers details.
  useEffect(() =>{
    const definedURL = "http://localhost:8590/admin/api/resources/farmers/actions/list?filters.phone_number=" + data.phone_number;
    const formData = new FormData();
    axios({
      method:'GET',
      maxBodyLength:Infinity,
      url:definedURL
    })
    .then(function (response) {
      const data = response.data.records[0].params;
      const spanFirstname = document.getElementById('fname');
      spanFirstname.textContent = data.first_name;
      const spanLastname = document.getElementById('lname');
      spanLastname.textContent = data.last_name;
      const signupDate = document.getElementById('signup_date');
      signupDate.textContent = data.createdAt.replace(/T.*Z/, '');
      const spanMarried = document.getElementById('married');
      spanMarried.textContent = data.is_married;
      const spanAge = document.getElementById('age');
      spanAge.textContent = data.age > 0 ? data.age : 'Not_provided';
    })
    .catch(err =>{
      console.log("error:");
    });
  },[]);


  const logFinancialRequestReview = (reason) => {
    const api = new ApiClient();
    api.resourceAction({
    resourceId:'Logs',
    actionName:'new',
    baseURL:'http://localhost:8590/admin/',
    method:'POST',
    headers: { 'Content-Type': 'application/json',},
    data: JSON.stringify({
        application_id:data._id,
        application_uuid:data.application_uuid,
        applicant_name:data.applicant_name,
        phone_number: data.phone_number,
        loan_amount: data.loan_amount,
        reason: reason,
        approved_by: currentAdmin[0].names
      }),
    }).then(results => {
        console.log(results);
    })
    .catch(err =>{
    console.log("error:     "+err);
    });
  };

  useEffect(() =>{
    const api = new ApiClient();
    api.resourceAction({
      resourceId:'farm_challenges',
      actionName:'list',
      baseURL:'http://localhost:8590/admin/',
      method:'GET',
      query:'?filters.farmer_uuid=' + data.farmer_uuid,
    }).then(results => {
      const challenges = document.getElementById('challenges');
      challenges.textContent = results.data.records[0].params.challenges_faced;
    })
    .catch(err =>{
      console.log("error:");
    });
  });
  
  const handleOnSubmit = (event:FormEvent) => {
    const inputReasonText = document.getElementById("remark");
    const inputRecordText =  document.getElementById("record");
    const radioOptionText = document.querySelector( 'input[name="optionReview"]:checked');
    const serverMessage = document.getElementById("server_message");

    if(inputReasonText.value == "" || inputRecordText.value == "") {
     inputReasonText?.focus();
     serverMessage.textContent="";
     event.preventDefault();
    }else{
      let applicationStatus = data.application_status;
      const formData = new FormData();
      const definedURL = 'http://localhost:8590/admin/api/resources/FinanceFilteredByPendingReviewStatus/records/' + data._id + '/edit';
      if(stepCnt == '0'){
        formData.append('application_status',radioOptionText.value);  
      }else{
        let statusValue;
        if(applicationStatus == 'PENDING REVIEW') {
          statusValue = 'IN REVIEW';
        }else if(applicationStatus == 'IN REVIEW'){
          statusValue = 'FINALIZING';
        }else if(applicationStatus == 'FINALIZING'){
          statusValue = 'PO COMPLETED';
        }else if(applicationStatus == 'PO COMPLETED'){
          statusValue = 'LOAN APPROVED';
        }else if(applicationStatus == 'LOAN APPROVED'){
          statusValue = 'FARMING ABOUT TO START';
        }else if(applicationStatus == 'ARMING ABOUT TO START'){
          statusValue = 'FARMING STARTS';
        }
        console.log('inside ifelse: '+statusValue+ '  ' +stepCnt);
        formData.append('application_status',statusValue);
        var remarks = inputReasonText.value;
        
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
          console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy "+remarks);
          logFinancialRequestReview(remarks);

        });
      }
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
            <div style={{height:"10px"}}/>
            <Box variant="grey" style={{padding:"5px"}}>
              <Label htmlFor="optionReview">Check the box below to move the application to the next stage</Label>
              <input type="checkbox" id="optionReview" name="optionReview"style={{accentColor:"#9d3039",height:"20px",width:"20px"}} value="IN REVIEW"/>
            </Box>
            <div style={{height:"10px"}}/>
            <Label htmlFor="message">Any remarks</Label>
            <TextArea
              id="remark"
              name="remark"
              fontsize="lg"
              rows={4} 
              cols={55}
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
    <Box>
      <Box variant="white"  mr="xxl" flexShrink={1}>
        <Stepper
            style={{fontFamily:"inherit",fontSize:"12px",paddingBlock:"0px"}}
            steps={steps}
            activeStep={stepCnt}
            connectorStateColors={true}
        />
      </Box>
      <Box flex>
        <Box variant="white" width={1/2} boxShadow="card" mr="xxl" flexShrink={1}>
          <Section>
            <Box variant="card">
              <Box flexGrow={1} style={{textAlign:"right"}}>
                <Badge size="xl"><span style={{fontSize:'13px'}}>{data.application_status}</span></Badge>
              </Box> 
              <Box><p><span style={{fontWeight:"bolder",fontSize:"15px",color:"GrayText"}}>Finance Application Details</span></p></Box>
              <div style={{background:"GrayText",height:"1px"}}/>
              <div style={{height:"10px"}}/>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Time"/> Application date:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.createdAt.replace(/T.*Z/, '')}</span>
                </span>
              </p>  
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="User"/> Applicant name:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.applicant_name}</span>
                </span>
              </p> 
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Projected price per chicken:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.projected_sales_price_per_chick}</span>
                </span>
              </p>                                       
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Loan amount: 
                  &nbsp;<span style={{fontWeight:"bolder"}}>KSH. {data.loan_amount.toLocaleString()}</span>
                </span>
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Avearage mortality rate:  
                  &nbsp;<span id="mortality_rate" style={{fontWeight:"bolder"}}></span>%
                </span>
              </p>              
              <p>
              <span style={{fontSize:"13px"}}><Icon icon="Types"/> No. of chicken currently raised: 
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.number_of_chicks_raised_now.toLocaleString()}</span>
                </span> 
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Bird house capacity: 
                  &nbsp;<span id="house_capacity" style={{fontWeight:"bolder"}}></span>
                </span> 
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Medicine & vaccine cost: 
                  &nbsp;<span style={{fontWeight:"bolder"}}>KSH. {data.vaccine_medicine_cost.toLocaleString()}</span>
                </span> 
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Chicks cost:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>KSH. {data.chick_cost.toLocaleString()}</span>
                </span>
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Feeds cost: 
                  &nbsp;<span style={{fontWeight:"bolder"}}>KSH. {data.feed_cost.toLocaleString()}</span>
                </span> 
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Types"/> Broad cost:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>KSH. {data.brooding_cost.toLocaleString()}</span>
                </span> 
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Building"/> Financial sponsor:  
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.financial_sponsor != null ? data.financial_sponsor: "Not provided"}</span>
                </span>
              </p>
              <p>
                <span style={{fontSize:"13px"}}><Icon icon="Time"/> Date finance is needed: 
                  &nbsp;<span style={{fontWeight:"bolder"}}>{data.date_required}</span>
                </span> 
              </p>
              <div style={{height:"10px"}}/>
              <Box><p><span style={{fontWeight:"bolder",fontSize:"15px",color:"GrayText"}}>Farm Details</span></p></Box>
              <div style={{background:"GrayText",height:"1px"}}/>
              <div style={{height:"10px"}}/>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Item farmed: <span id="item_farmed" style={{fontWeight:"bolder"}}></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Location: <span id="location" style={{fontWeight:"bolder"}}></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Challenges: <span id="challenges" style={{fontWeight:"bolder"}}></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Farm has insurance?: <span id="has_insurance" style={{fontWeight:"bolder"}}></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Insurer name: <span id="provider" style={{fontWeight:"bolder"}}></span></span></p> 
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> No. of employees: <span id="employee_count" style={{fontWeight:"bolder"}}></span></span></p>        
            </Box>
          </Section>
        </Box>
        <Box variant="white" width={1/2} boxShadow="card" mr="xxl" flexShrink={1}>
          <SmallText><span id="server_message" style={{color:"red",fontSize:"12px",fontWeight:"bolder"}}></span></SmallText>
          <Section>
            <Box variant="card">
              <span style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '20px', color: 'GrayText'}}>
                <Icon icon="User"/> <span id="fname">{data.first_name}</span>
              </span>
              <span style={{ fontWeight: 'bold', fontFamily: 'calibri',fontSize: '40px' }}><span id="lname"></span></span>
              <div style={{height:"10px"}}/>
              <p><span style={{fontSize:'13px'}}><Icon icon="Phone"/> {data.phone_number}</span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Time"/> <span id="signup_date"></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Married: <span id="married"></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Age: <span id="age"></span></span></p>
              <p><span style={{fontSize:'13px'}}><Icon icon="Types"/> Years of Experience <span id="exp"></span></span></p>
            </Box>
          </Section>
          <div style={{background:"GrayText",height:"1px"}}/>
          <Box pb="x4"><FormFinanceApplicationReview/></Box>
        </Box>
      </Box>
    </Box>
  )
};

export default LoanReviewAction