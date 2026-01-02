const express=require("express");
const router=express.Router();
const Contact=require("../models/Contact");

router.get("/",async(req,res)=>{
    try{
        const contacts=await Contact.find().sort({createdAt:-1});
        res.json(contacts);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const contact=new Contact(req.body);
        const saved=await contact.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id);
        res.json({message:"Contact deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;
