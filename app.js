const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require('path');
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection to DB Successful");
})
.catch((err)=>{
    console.log(err);
}); 
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//Index Route
app.get("/listings",async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
});

//Show Route
app.get("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         desc : "By the Beach",
//         price :1200,
//         location :"Goa",
//         country : "India"
//     });
//     await sampleListing.save();
//     console.log("Sample Saved");
//     res.send("Success");
// });

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});


app.listen(8080,()=>{
    console.log("App Listening to Port :",8080);
});