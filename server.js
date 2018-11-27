const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketIO(server)


io.on('connection', socket => {
  console.log('connected')
  
 
  socket.on('person', (name, age, id) => {
   
    console.log('person created', name, age, id)
    socket.broadcast.emit('person', {
      name,
      age,
      id
    })
  })
  
  
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})

server.listen(4001, () => console.log("Listening"))