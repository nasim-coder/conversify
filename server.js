const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const db = require('./models/index');

// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("db altered successfully");
//   })
//   .catch((err) => {
//     console.log("err//or", err); 
//   });

app.listen(PORT, ()=>console.log(`server is running on PORT: ${PORT}`));