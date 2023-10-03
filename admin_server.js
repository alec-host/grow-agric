const { app, PORT} = require('./app/config/web.config');
const { findUserByUUID } = require('./app/controllers/utility/common.controller');
const { AddCourse, EditCourse, GetChatMessage, Chat } = require('./app/controllers/web.admin.controller');

const http = require('./app/controllers/utility/http.handle');

const upload = require('./app/middleware/upload');

app.post('/update', async(req, res) => {
  const message = await req.body.message;
  const record = req.body.record;
  res.status(200).json({"message":message,"record":record});
});

app.post('/addCourse',upload.single('file'), async(req, res) => {
  if(Object.keys(req.body).length !== 0){
    const {module_uuid,course_name,description,record_id} = req.body;
    const {filename,path} = req.file;
    if(record_id == '0'){
      const resp = await AddCourse({module_uuid,course_name,description,filename,path});
    }else{
      console.log('EDIT '+record_id);
      const resp = await EditCourse({module_uuid,course_name,description,filename,path,record_id});
    } 
    res.status(200).json({module_uuid,course_name,description,filename,path});
  }else{
    res.status(500).json({
    success: false,
    error: true,
    message: "Missing: request payload not provided."
    });          
  }
  console.log(req.file);
});

app.post('/modifyCourse', async(req, res) => {
  if(Object.keys(req.body).length !== 0){
    const {module_uuid,course_name,description,record_id,is_deleted} = req.body;
    const resp = await EditCourse({module_uuid,course_name,description,record_id,is_deleted});
    res.status(200).json({module_uuid,course_name,description,is_deleted});
  }else{
    res.status(500).json({
    success: false,
    error: true,
    message: "Missing: request payload not provided."
    });          
  }
});

app.post('/getChatMessage', async(req, res) => {
  if(Object.keys(req.body).length !== 0){
    const {farmer_uuid} = req.body;
    const response = await GetChatMessage(farmer_uuid);
    if(response){
      res.status(200).json({
        success: true,
        error: false,
        message: response
      });
    }else{
      res.status(200).json({
        success: false,
        error: false,
        message:"No message(s)"
      });
    }
  }else{
    res.status(500).json({
    success: false,
    error: true,
    message: "Missing: request payload not provided."
    });          
  }
});

app.post('/chat', async(req, res) => {
  if(Object.keys(req.body).length !== 0){
    const {farmer_uuid,message,message_origin,type} = req.body;
    const user = await findUserByUUID(farmer_uuid);
    if(user){
      const resp = await Chat({farmer_uuid,message,message_origin});
      if(resp){
        const fcmPayload = {
          user_uuid:farmer_uuid,
          device_token:user.push_notification_token,
          title:"message",
          subject:message,
          type:type
        };
        await http.postJsonData("http://localhost:8585/api/v1/users/fcm",fcmPayload);
        res.status(200).json({
          success: true,
          error: false,
          message: "message received"
        });
      }else{
        res.status(200).json({
          success: false,
          error: false,
          message:"No message(s)"
        });
      }
    }else{
      return res.status(404).json({
        success: false,
        error: true,
        message: "User with id: "+ farmer_uuid +" not found."
      });        
    }
  }else{
    res.status(500).json({
    success: false,
    error: true,
    message: "Missing: request payload not provided."
    });          
  }

});

app.listen(PORT, async() => {
  console.log(`Server listening on the port::::${PORT}`);
});