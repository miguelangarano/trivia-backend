const Question = require('../models/question')
const Player = require('../models/player')
const axios = require("axios")
async function getSingleTriviaQuestion() {

    const triviaQuestion = await getTriviaQuestionAPI()
    insertQuestionIntoDB(triviaQuestion)

    return triviaQuestion;
}

function insertQuestionIntoDB(question){
    
    
        Question.create({
        question:question.question,
        answer:question.correctAnswer
        }).catch((error)=>{console.log("Error duplicado;",error)})

}
async function verifyAnswer(question, answer){
    const trivia = await Question.findOne({question})
    if(trivia !=null && trivia.answer==answer){
        return true
    }
    return false
}


async function updatePlayerScore(userName,winner){
    const player = await Player.findOne({name:userName})
    if(player ==null){
        throw new error("Player not found")
    }
    if(winner==true){
        player.score++;
        player.save()
    }
    return player.score
}

async function getTriviaQuestionAPI(){
    const data = await axios.get("https://opentdb.com/api.php?amount=1")
    console.log(data.data.results[0])
    const options=["","","",""]
    const positionAnswer=Math.floor(Math.random() * 3);
    options[positionAnswer]=data.data.results[0].correct_answer
    let j=0
    for (let index = 0; index < 4 ; index++) {
        if(options[index]==""){
            options[index]=data.data.results[0].incorrect_answers[j]
            j++
        }
        
        
    }
    const triviaQuestion = {
        question:data.data.results[0].question,
        answer:options,
        correctAnswer:data.data.results[0].correct_answer
    }
    return triviaQuestion

}
module.exports={getSingleTriviaQuestion,verifyAnswer,updatePlayerScore}