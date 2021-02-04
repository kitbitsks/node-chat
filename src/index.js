const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')

app.use(express.static(publicDirPath))

// let count = 0
let message = 'Welcome to NodeJS based Chat APP!'

io.on('connection', (socket) => {
    console.log('New Socket Connection!')
    socket.emit('message',message)
    socket.broadcast.emit('message', 'A new user has joined !')
    socket.on('sendMessage',(textRecievedAndSentToOthers,callback)=>{
        console.log('this is callback')
        const filter = new Filter()
        if(filter.isProfane(textRecievedAndSentToOthers)){
            return callback('Profanity is not allowed !')
        }
        io.emit('message',textRecievedAndSentToOthers)
        callback()

    })
    socket.on('geolocation',(geoLocation,callback)=>{
        io.emit('location-message',`https://google.com/maps?q=${geoLocation.latitude},${geoLocation.longitude}`)
        callback()
    })
    socket.on('disconnect',(message)=>{
        io.emit('message', 'Someone has left the chatroom !')
    })
})

server.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`)
})