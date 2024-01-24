const express = require("express");
const { Joi } = require('joi');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

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

//Validate Review
const validateReview = (req,res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};


//Index Route
router.get("",wrapAsync(async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
}));

//New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Edit Route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route 
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    res.redirect(`/listings/${id}`);
}));

//Destroy Route
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del, "Deleted Successfully");
    res.redirect("/listings");
}));

//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

//Create Route
router.post("",validateListing,wrapAsync(async(req,res, next)=>{
    //let {title,desc, image,price,location,country} = req.body;
        let newlisting = new Listing(req.body.Listing);
        await newlisting.save();
        res.redirect("/listings");
}));


module.exports = router;