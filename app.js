const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')


app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));


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

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route 
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    res.redirect(`/listings/${id}`);
});

//Destroy Route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del, "Deleted Successfully");
    res.redirect("/listings");
});

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route
app.post("/listings",async(req,res)=>{
    //let {title,desc, image,price,location,country} = req.body;
    let newlisting = new Listing(req.body.Listing);
    await newlisting.save();
    res.redirect("/listings");
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