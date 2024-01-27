const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")

const Listing = require("../models/listing.js");
const {isLoggerIn, isOwner, validateListing } = require('../middleware.js');
// const isOwner = require('../middleware.js');

//Validate Listing


//Validate Review


//Index Route
router.get("",wrapAsync(async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
}));

//New Route
router.get("/new", isLoggerIn, (req, res) => {
    res.render("listings/new.ejs");
});

//Edit Route
router.get("/:id/edit",isLoggerIn,isOwner,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));



//Destroy Route
router.delete("/:id",isLoggerIn,isOwner,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del, "Deleted Successfully");
    req.flash("success", "Listing Successfully Deleted!");
    res.redirect("/listings");
}));

//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", 
    populate: {
        path : "author",
    },}).populate("owner");
    if(!listing){
        req.flash("error", "Listing Does Not Exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}));

//Create Route
router.post("/",isLoggerIn,wrapAsync(async (req,res, next)=>{
    //let {title,desc, image,price,location,country} = req.body;
        let newlisting = new Listing(req.body.Listing);
        newlisting.owner = req.user._id;
        await newlisting.save();
        req.flash("success", "New Listing Successfully Added!");
        res.redirect("/listings");
}));

//Update Route 
router.put("/:id",isLoggerIn,isOwner,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    req.flash("success", "Listing Successfully Updated!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;