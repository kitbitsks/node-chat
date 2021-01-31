const path = require('path')
const express = require('express')
const { nextTick } = require('process')
const app = express()
const PORT = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')

// writing multiples middleware and execute on each call
const loadPublicDirPath = (req,res,next) =>{
    res.send("yes")
    next()
}

const logTheIncomingRequest = (req,res,next) =>{
    console.log(`PATH ${req.originalUrl}`)
    next()
}

const logTimeOfReq = (req,res,next) =>{
    console.log(Date.now())
    next()
}

middlewareFuncToBeExecuted = [loadPublicDirPath, logTheIncomingRequest, logTimeOfReq ]

app.use(middlewareFuncToBeExecuted)


app.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`)
})