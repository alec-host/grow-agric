const { app, PORT} = require("./app/config/web.config");

app.post('/update', async(req, res) => {

  const message = await req.body.message;
  const record = req.body.record;
 
  res.status(200).json({"message":message,"record":record});
});

app.listen(PORT, async()=>{
  console.log(`Server listening on the port::::${PORT}`);
});