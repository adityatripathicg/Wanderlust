const Listing = require("../models/listing.js");


module.exports.index = async(req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
};
module.exports.renderNew = (req, res) => {
    res.render("listings/new.ejs");
};
module.exports.edit = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
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
    //let {title,desc, image,price,location,country} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
        let newlisting = new Listing(req.body.Listing);
        newlisting.owner = req.user._id;
        newlisting.image = {url, filename};
        await newlisting.save();
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
    await Listing.findByIdAndUpdate(id, {...req.body.Listing});
    req.flash("success", "Listing Successfully Updated!");
    res.redirect(`/listings/${id}`);
};