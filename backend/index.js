const express=require("express");
const app=express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));


const User=require("./models/userdata");
const connect=require("./utils/dbconnect");
connect();
const userRoute=require("./routes/UserRoute");

app.listen(8080,(req,res)=>{
    console.log("listen");   
})
app.use("/api/v1",userRoute);
