const path = require('path')
const express = require('express')
const { nextTick } = require('process')
const app = express()
const PORT = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')

app.use(express.static(publicDirPath))


app.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`)
})