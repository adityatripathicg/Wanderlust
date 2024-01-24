const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");

app.get("/",(req,res)=>{
    res.send("Hi, I am Root");
});

app.use("/users", users);
app.use("/posts", posts);





app.listen(3000, ()=>{
    console.log("App Listening to Port :" + 3000);
});