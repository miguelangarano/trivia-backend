const express = require('express')
const { getSingleTriviaQuestion,verifyAnswer,updatePlayerScore } = require('./utils')
const router = new express.Router()

const verifyToken = require("../middleware/auth")

router.get('/questions/single', verifyToken,async (req, res) => {
    try{
        const question = await getSingleTriviaQuestion();
      res.status(200).send(
        {
          data:{question},
          status:true,
          message:"Done"
        }
      )
    }catch(error){
      console.log(error)
      return res.status(500).send(    {
        data:{error:error.toString()},
        status:false,
        message:"Error in the query" 
      })
    }
})

router.post('/questions/response',verifyToken, async(req,res)=>{
  
  try{  
    const  request = req.body;
    const winner = await verifyAnswer(request.question,request.answer)
    const score =   updatePlayerScore(req.headers["user"],winner)
    res.status(200).send(
      {
        data:{score},
        status:true,
        message:"Update Done"
      }
    )
  }catch(error){
    return res.status(401).send(    {
      data:{error:error.toString()},
      status:false,
      message:"Update Failed" 
    })
  }
})

module.exports = router