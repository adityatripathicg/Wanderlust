const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


main().then(()=>{
    console.log("Connection to DB Successful");
})
.catch((err)=>{
    console.log(err);
}); 
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=> ({...obj, owner: "65b2bf6412cadff5551b7741" }));
    await Listing.insertMany(initdata.data);
    console.log("Data Was Initialized");
};

initDb();