const User = require("../models/user.js");


module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs"); 
};

module.exports.signUp = async (req,res)=>{
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
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs"); 
};
module.exports.login = async (req,res)=>{
    req.flash("success","Welcome to WanderLust you are Logged In Successfully!");
    let url = res.locals.redirectUrl || "/listings";
    res.redirect(url);
};

module.exports.signOut = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged Out Successfully");
        let url = res.locals.redirectUrl || "/listings";
        res.redirect(url);
    });
};