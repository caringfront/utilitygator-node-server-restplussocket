const express = require("express");
const cors = require("cors");
require('dotenv').config()
const http = require("http");
const socketIO = require("socket.io");
const db = require('./queries')

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    }
  },
  pingTimeout: 60000,
})

const port = process.env.PORT || 3030;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE"
}));

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/posts', (req, res,next)=>{
    
    res.json({success: 200});
   
});

const getPosts = (request, response) => {

}

app.post('/users/login', db.login);

  app.route('/posts')
  // GET endpoint
  .get(getPosts)

app.get('/cams', db.getCams)
app.get('/cams/:id', db.getCamById)
app.post('/cams', db.createCam)

app.get('/incidents', db.getIncidents);
app.get('/incidents/:id', db.getIncidentById);
app.post('/incidents', db.createIncident);
app.get('/lastincident', db.getLastIncident);

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

server.listen(port, () => {
  console.log(`Server up and running on port http://localhost:${port}`);
})

