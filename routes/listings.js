const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const {isLoggerIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require('../cloudConfig.js'); // Assuming that cloudConfig.js exports the storage object

const upload = multer({ storage: storage });
//Validate Listing


//Validate Review


//Index  And Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggerIn, upload.single('Listing[image]'),wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggerIn, listingController.renderNew);

////Show, Destroy And Update Route 
router.route("/:id")
.get(wrapAsync(listingController.showlisting))
.delete(isLoggerIn,isOwner,wrapAsync(listingController.deletelisting))
.put(isLoggerIn,isOwner,wrapAsync(listingController.updatelisting));

//Edit Route
router.get("/:id/edit",isLoggerIn,isOwner,wrapAsync(listingController.edit));


module.exports = router;