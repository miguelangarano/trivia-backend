
const express = require('express')
const router = new express.Router()
const Player = require('../models/player')

router.get('/game/scoreboard',async(req,res)=>{
    try{
        console.log(res.body,"Wenas")
        const player = await Player.find().sort({score:-1}).limit(10).catch((error)=>{
            console.log("Get positions",error)
            throw new Error("Existing user")
        })
        const players = []
        player.forEach((item,index)=>{
            players.push({
                ...item._doc,
                position:index+1
            })
        })
        res.status(200).send({
            data:{player:players},
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