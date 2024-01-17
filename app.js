const express = require("express");
const app = express();
const mongoose = require("mongoose");


main().then(()=>{
    console.log("Connection to DB Successful");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.get("/",(req,res)=>{
    res.send("Hi I am Root");
})


app.listen(8080,()=>{
    console.log("App Listening to Port :",8080);
});