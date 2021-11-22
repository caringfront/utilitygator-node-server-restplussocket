const express = require("express");
const cors = require("cors");
require('dotenv').config()
const http = require("http");
const socketIO = require("socket.io");
const { pool } = require('./config')
const db = require('./queries')

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  },
  pingTimeout: 60000,
})

const port = process.env.PORT || 3030;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

var Client = require("ibmiotf");

var config = {
    'org': '',
    'domain': '',
    'type': '',
    'id': '',
    'auth-method': 'token',
    'auth-token': ''
  };

app.get('/', (req,res) => {
  res.send('Hello')
})

app.post('/posts', (req, res,next)=>{
    
    var longitude = req.body.lon;
    var latitude = req.body.lat;

    var deviceClient = new Client.IotfDevice(config);
    deviceClient.connect();
    console.log("Publish connection successful");

    deviceClient.on('connect', function() {
        var QOS = 2;
        console.log("connected");
        var data=req.body;
        deviceClient.publish('android', 'json', JSON.stringify(data), QOS);

      });

      deviceClient.on('reconnect', function() {
        console.log('Reconnected!!!');
      });

      deviceClient.on('disconnect', function() {
        console.log('Disconnected from IoTF');
      });

      deviceClient.on('error', function(argument) {
        console.log(argument);
      });

    console.log({longitude, latitude});
    
    res.json({success: 200});
   
});

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  app.route('/posts')
  // GET endpoint
  .get(getPosts)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

server.listen(port, () => {
  console.log(`Server up and running on port http://localhost:${port}`);
})


