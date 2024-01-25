//Require
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/user.js");
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


//Set Use
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const sessionOptions= {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 3, // cookie will expire after 1 week
        maxAge : 1000 * 60 * 60 * 24 * 3,
        httpOnly : true,
    },
};
app.use(session(sessionOptions));
app.use(flash());
 // basic passport setup
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 // main 
    main().then(()=>{
        console.log("Connection to DB Successful");
    })
    .catch((err)=>{
        console.log(err);
    }); 
    async function main(){
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    }


app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});


app.use((req,res,next)=>{ // Success Error Flash
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/demouser", async (req,res)=>{
    let fakeUser = new User({
        email : "cg@gmail.com",
        username : "cg",
    });
    let reguser = await User.register(fakeUser, "password");
    res.send(reguser);
});
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"))
})
app.use((err,req,res,next)=>{
    let {status=500, message="Something Went Wrong"} = err;
    res.status(status).render("listings/error.ejs", {err});
    //res.send("Something Went Wrong");

});

app.listen(8080,()=>{
    console.log("App Listening to Port :",8080);
});