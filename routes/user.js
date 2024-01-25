const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');


router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs"); 
});

router.post("/signup" , wrapAsync(async (req,res)=>{
    try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const reguser2 = await User.register(newUser, password);
    console.log(reguser2);
    req.flash("success", "User Registered Successfully");
    res.redirect("/listings");
    } catch (error) {
        req.flash("error", error.message);
    }
}));

router.get("/login", (req,res)=>{
    res.render("users/login.ejs"); 
});

router.post("/login" ,passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}) ,wrapAsync(async (req,res)=>{
    req.flash("success","Welcome to WanderLust you are Logged In Successfully!");
    res.redirect("/listings");
}));

module.exports = router;