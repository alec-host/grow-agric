const { app, db, PORT } = require("./app/config/config");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(PORT, async()=>{
    console.log(`Server listening on the port::::${PORT}`);
});