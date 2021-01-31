const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')

app.use(express.static(publicDirPath))

let count = 0

io.on('connection', (socket) => {
    console.log('socket connection established !')
    socket.emit('countUpdated', count)

    socket.on('increament',()=>{
        count++
        // emit to specific connection
        // socket.emit('countUpdated', count)
        // emit event to all connection
        io.emit('countUpdated', count)        
    })
})

server.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`)
})