const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Post Reviews  Route
module.exports.addReview = async (req,res)=>{
    //console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    //console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New Review Saved");
    //res.send("New Review Saved");
    req.flash("success", "New Review Successfully Added!");
    res.redirect(`/listings/${listing._id}`);

};

//Delete Review Route
module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};