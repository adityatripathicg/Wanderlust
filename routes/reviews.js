const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggerIn, isReviewAuthor} = require("../middleware");
const { addReview, destroyReview } = require("../controllers/reviews.js");


//Validate Listing



//Reviews 
//Post Reviews  Route
router.post("", isLoggerIn ,validateReview, wrapAsync(addReview));

//Delete Review Route 
router.delete("/:reviewId",isLoggerIn,isReviewAuthor, wrapAsync(destroyReview));

module.exports = router;