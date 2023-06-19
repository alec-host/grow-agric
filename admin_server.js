const { app, PORT, db } = require("./app/config/web.config");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/update', async(req, res) => {

  //console.log('sssssssssssssssss'+req.body.message);
  const message = await req.body.message;
  const record = req.body.record;
  /*
  axios({
    method: 'post',
    url: 'http://localhost:8590/admin/api/resources/Applicants/records/'+ data._id +'/edit',
    responseType: 'json'
  })
  .then(function (response) {
    console.log(response.data.records[0].params);
  });
  */
  res.status(200).json({"message":message,"record":record});
});

app.listen(PORT, async()=>{
  console.log(`Server listening on the port::::${PORT}`);
});