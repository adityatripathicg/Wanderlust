const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require('express-session');
const flash = require("connect-flash");
const path = require(`path`);

app.use(session({secret: "mysupersecretstring", resave:false, saveUninitialized:true}));
app.use(flash());
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    //console.log(req.session);
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error","User not Registered");
    }else{
        req.flash("success","User Registered Successfully");
    }
    res.redirect("/hello");
});

app.use((req,res,next)=>{
    res.locals.msg = req.flash("success");
    res.locals.ermsg = req.flash("error");
    next();
});
app.get("/hello",(req,res)=>{
    // res.send(`Hello ${req.session.name}`);
    res.render("page.ejs",{name : req.session.name });
});


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else {
//         req.session.count = 1;
//     }
    
//     res.send(`You sent a req ${req.session.count} times`);
// });


// app.get("/test",(req,res)=>{
//         res.send("Test Successful");
//});


app.listen(3000, ()=>{
    console.log("App Listening to Port :" + 3000);
});




// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("greet", "hello");
//     res.cookie("madeIn", "India", {signed:true});
//     res.send("Signed Cookie Sent");
// });

// app.get("/verify", (req,res)=>{
//     console.log(req.signed.cookies);
//     res.send("Verify");
// });

// //How to send cookies in express
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet", "hello");
//     res.cookie("madeIn", "India");
//     res.send("Cookie Sent");
// });

// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"} = req.cookies; 
//     console.dir(req.cookies);
//     res.send(`Hi, ${name}`);
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, I am Root");
// });

// app.use("/users", users);
// app.use("/posts", posts);