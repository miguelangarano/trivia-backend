const express = require('express')
const Player = require('../models/player')

const router = new express.Router()


router.post("/players/register", async (req,res)=>{
    try{
    const reques = req.body
    const player = await Player.create(
        {
            name:reques.name,
            password:reques.password
        }
    ).catch((error)=>{
        console.log("Error duplicado;",error)
        throw new Error("Existing user")
    })

    await player.hashPassword()
    await player.save()
    const token = await player.generateToken()
    console.log(token)
    res.status(200).send(    {
        data:{token},
        status:true,
        message:"Done"
      })

    }catch(error){
        console.log(error);
        res.status(200).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Error" 
        })
    }
})

router.post("/players/login",async(req,res)=>{
    try{
        const request = req.body
        const player = await Player.findOne({
            name:request.name
        }).catch((error)=>{
            console.log("Login Failed",error)
            throw new Error("Existing user")
        })
        if (player==null){
            res.status=false
            throw new Error("User not found")
            
        }
        const match = await player.verifyPassword(request.password)
        if(match==false){
            throw new Error("Incorrect Password")
        }
        const token = await player.generateToken()
        res.status(200).send(    {
            data:{token},
            status:true,
            message:"Correct Verify" 
        }) 

    }catch(error){
        console.log(error);
        res.status(200).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Error" 
        })
    }
})
module.exports = router