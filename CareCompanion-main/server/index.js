require('dotenv').config();
const express = require("express");
const app=express();
const cors=require("cors");
const connection= require("./db");
const userRoutes= require('./routes/users');
const authRoutes= require('./routes/auth');
const records=require('./routes/records');

//database connection
connection();


//middlewares

app.use(express.json())
app.use(cors());




const port=process.env.PORT || 9000;
app.listen(port, () => console.log('Listening on port' + port));

//routes
console.log("inde");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/records", records);