const express = require("express")
const cors = require('cors')
const app = express()
const port = 4001
const gameRouter = require("./src/game/index")
const playerRouter = require("./src/player/index")
const positionRouter = require("./src/positions/index")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)

app.use(express.json())
app.use(cors())
app.use(gameRouter)
app.use(playerRouter)
app.use(positionRouter)


app.listen(port,()=>{
    console.log("server init on port "+port)
})

