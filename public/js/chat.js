const socket = io()

socket.on('countUpdated',(count)=>{
    console.log('The count updated !', count)
})

document.querySelector('#increament').addEventListener('click',()=>{
    socket.emit('increament')
})