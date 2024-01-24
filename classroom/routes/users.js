const express = require("express");
const router = express.Router();


//Index - users
router.get("",(req,res)=>{
    res.send("GET for Users");
});
//Show - users
router.get("/:id",(req,res)=>{
    res.send("GET for Show Users id");
});
//POST - users 
router.post("/:id",(req,res)=>{
    res.send("POST for Show Users");
});
//Delete - users
router.delete("/:id",(req,res)=>{
    res.send("Delete for Users ID");
});

module.exports = router;