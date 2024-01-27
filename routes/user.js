const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

//SignUp Route
router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs"); 
});
router.post("/signup" , wrapAsync(async (req,res)=>{
    try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const reguser2 = await User.register(newUser, password);
    console.log(reguser2);
    req.login(reguser2,(req,res,err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "User Registered Successfully");
        let url = res.locals.redirectUrl || "/listings";
        res.redirect(url);
    });

    } catch (error) {
        req.flash("error", error.message);
    }
}));

//Login Route
router.get("/login", (req,res)=>{
    res.render("users/login.ejs"); 
});
router.post("/login" ,saveRedirectUrl,passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}) ,wrapAsync(async (req,res)=>{
    req.flash("success","Welcome to WanderLust you are Logged In Successfully!");
    let url = res.locals.redirectUrl || "/listings";
    res.redirect(url);
}));

//LogOut Route
router.get("/logout", (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged Out Successfully");
        let url = res.locals.redirectUrl || "/listings";
        res.redirect(url);
    });
});

module.exports = router;