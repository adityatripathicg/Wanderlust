const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

main().then(()=>{
    console.log("Connection to DB Successful");
})
.catch((err)=>{
    console.log(err);
}); 
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/testListing", async (req,res)=>{
    let sampleListing = new Listing({
        title : "My New Villa",
        desc : "By the Beach",
        price :1200,
        location :"Goa",
        country : "India"
    });
    await sampleListing.save();
    console.log("Sample Saved");
    res.send("Success");
});

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});


app.listen(8080,()=>{
    console.log("App Listening to Port :",8080);
});