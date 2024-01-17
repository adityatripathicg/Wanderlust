const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    desc: String,
    image: {
        filename: String,
        url: String
      },
    // image : {
    //     type : String,
    //     default : "https://unsplash.com/photos/a-snowy-hill-with-trees-on-it-7Hx3RHJFuzo",
    //      set : (v)=> v === "" ? "https://unsplash.com/photos/a-snowy-hill-with-trees-on-it-7Hx3RHJFuzo" : v,
    // },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;