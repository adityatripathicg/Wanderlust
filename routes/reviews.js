const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggerIn, isReviewAuthor} = require("../middleware");


//Validate Listing



//Reviews 
//Post Reviews  Route
router.post("", isLoggerIn ,validateReview, wrapAsync(async (req,res)=>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New Review Saved");
    //res.send("New Review Saved");
    req.flash("success", "New Review Successfully Added!");
    res.redirect(`/listings/${listing._id}`);

}));

//Delete Review Route 
router.delete("/:reviewId",isLoggerIn,isReviewAuthor, wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;