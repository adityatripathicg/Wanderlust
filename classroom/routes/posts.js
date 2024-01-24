const express = require("express");
const app = express();
const router = express.Router();


//POSTS
//Index
router.get("",(req,res)=>{
    res.send("GET for posts");
});
//Show
router.get("/:id",(req,res)=>{
    res.send("GET for Show posts id");
});
//POST
router.post("/:id",(req,res)=>{
    res.send("POST for Show posts");
});
//Delete
router.delete("/:id",(req,res)=>{
    res.send("Delete for posts ID");
});

module.exports = router;