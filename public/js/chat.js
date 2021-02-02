const socket = io()

socket.on('message', (message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) =>{
        if (error) {
            return console.log(error)
        }
    console.log('This message was delivered !')
    })
})

document.querySelector('#sendLocation').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by browse')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        let geoLocation = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }
        socket.emit('geolocation', geoLocation, ()=>{
            console.log("location shared")
        })
    })
})