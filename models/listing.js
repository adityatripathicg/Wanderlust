const mongoose = require("mongoose");
const Review = require("./review.js");
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
    reviews : [
        {
            type :Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (req,res)=>{
if(listing){
    await Review.deleteMany({reviews : { $in : listingSchema.reviews}});
}
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;