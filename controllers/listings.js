const Listing = require("../models/listing.js");
//const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = undefined;
if(mapToken!=="undefined"){
//const geocodingClient = mbxGeocoding({ accessToken: mapToken });
}

module.exports.index = async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
};
module.exports.renderNew = (req, res) => {
    //res.send("New Listing Page");
    res.render("listings/new.ejs");
};
module.exports.edit = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing, originalUrl});
};
module.exports.showlisting = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", 
    populate: {
        path : "author",
    },}).populate("owner");
    if(!listing){
        req.flash("error", "Listing Does Not Exist");
        res.redirect("/listings");
    }
    //console.log(listing);
    res.render("listings/show.ejs",{listing});
};
module.exports.createListing = async (req,res, next)=>{
    
    // let response = await geocodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1,
    //   })
        // .send();
        let url = req.file.path;
        let filename = req.file.filename;
        let newlisting = new Listing(req.body.Listing);
        newlisting.owner = req.user._id;
        newlisting.image = {url, filename};
        //newlisting.geometry = response.body.features[0].geometry;

        let savedListing = await newlisting.save();
        req.flash("success", "New Listing Successfully Added!");
        res.redirect("/listings");
};
module.exports.deletelisting = async (req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del, "Deleted Successfully");
    req.flash("success", "Listing Successfully Deleted!");
    res.redirect("/listings");
};
module.exports.updatelisting = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
        
    req.flash("success", "Listing Successfully Updated!");
    res.redirect(`/listings/${id}`);
};