import express from "express";
import GrpRegistrationModel from "../../models/student/GrpRegistration.js";
//newly added
import GrpRegistrationcontr from "../..";


const router = express.Router();

//CREATE
router.post("/", async (req,res)=>{
    const newRegistration = new GrpRegistrationModel(req.body)

    try{
        const savedRegistration = await newRegistration.save()
        res.status(200).json(savedRegistration)
    }catch(err){
        res.status(500).json(err)
    }
})

// router.get("/", (req,res)=>{
//     res.send("This is Rergistration page")
// })


export default router
