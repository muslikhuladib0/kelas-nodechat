const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// permision file assets
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  let users = {}, 
      usernames = []
  io.on('connection', socket => {

        
        
        // send chat
        socket.on('newMessage', (msg) => {
          io.emit('newMessage', msg)
        })
        
        // login
        // detect informasi dari client side key , value
        socket.on('loginUser', username => {
          // menampilkan user online 
          usernames.push(username)
          users[socket.id] = username
          // kirim data untuk semua user 
          io.emit('onlineUsers', usernames)
                    

     // kirim data untuk kita sendiri
     socket.emit('loginResponse', true)
            })
  });
  
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });