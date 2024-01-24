const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));

app.get("/getsignedcookies",(req,res)=>{
    res.cookie("greet", "hello");
    res.cookie("madeIn", "India", {signed:true});
    res.send("Signed Cookie Sent");
});

app.get("/verify", (req,res)=>{
    console.log(req.signed.cookies);
    res.send("Verify");
});

//How to send cookies in express
app.get("/getcookies",(req,res)=>{
    res.cookie("greet", "hello");
    res.cookie("madeIn", "India");
    res.send("Cookie Sent");
});

app.get("/greet",(req,res)=>{
    let {name = "anonymous"} = req.cookies; 
    console.dir(req.cookies);
    res.send(`Hi, ${name}`);
});

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("Hi, I am Root");
});

app.use("/users", users);
app.use("/posts", posts);





app.listen(3000, ()=>{
    console.log("App Listening to Port :" + 3000);
});