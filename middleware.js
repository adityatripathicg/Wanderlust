const Listing = require("./models/listing"); 
const Review = require("./models/review.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggerIn = (req, res, next) => {
    if (!req.isAuthenticated()){
      //redirectUrl.save
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "Please Login First and then Continue");
      return res.redirect("/login"); // Return here to stop further execution
    }
    next(); // Call next only if the user is authenticated
  };
  
  //module.exports = isLoggerIn;

  module.exports.saveRedirectUrl = (req,res, next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next(); 
  };

module.exports.isOwner = async (req,res,next)=>{
  let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You Don't have Permission to edit");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing = async (req,res,next)=>{
  let {error} = await listingSchema.validate(req.body);
  console.log(error); 
  if(error){
      throw new ExpressError(400,error);
  }
  else{
      next();
  };
};

//Validate Review
module.exports.validateReview = (req,res, next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error) {
      let errmsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errmsg);
  }
  else{
      next();
  }
};

module.exports.isReviewAuthor = async (req,res,next)=>{
  let { id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You Do not have permission to delete this review");
        return res.redirect(`/listings/`);
    }

    next();
};