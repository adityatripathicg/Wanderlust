const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");


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

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});

//Validate Listing
const validateListing = (req,res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};
//Index Route
app.get("/listings",wrapAsync(async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
}));

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route 
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    res.redirect(`/listings/${id}`);
}));

//Destroy Route
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del, "Deleted Successfully");
    res.redirect("/listings");
}));

//Show Route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Create Route
app.post("/listings",validateListing,wrapAsync(async(req,res, next)=>{
    //let {title,desc, image,price,location,country} = req.body;
        let newlisting = new Listing(req.body.Listing);
        await newlisting.save();
        res.redirect("/listings");
    
}));


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



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"))
})
app.use((err,req,res,next)=>{
    let {status=500, message="Something Went Wrong"} = err;
    //res.status(status).send(message);
    res.status(status).render("listings/error.ejs", {err});
    //res.send("Something Went Wrong");

});

app.listen(8080,()=>{
    console.log("App Listening to Port :",8080);
});