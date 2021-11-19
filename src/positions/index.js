
const express = require('express')
const router = new express.Router()
const Player = require('../models/player')

router.get('/game/scoreboard',async(req,res)=>{
    try{
        const response =res.body
        console.log(res.body)
        const player = await Player.find().sort({score:-1}).limit(10).catch((error)=>{
            console.log("Get positions",error)
            throw new Error("Existing user")
        })
        res.status(200).send({
            data:{player},
            status:true,
            message:"Correct Verify" 
        }) 
    }catch(error){
        console.log(error);
        res.status(500).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Error" 
        })
    }
})
module.exports = router