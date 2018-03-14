const express = require('express')
const app = express()
const postsPath = require('./api/routes/posts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const client = require('socket.io').listen(4000).sockets
const Post = require('./api/models/post')
// Importing the necessary modules

mongoose.connect('mongodb://localhost:27017/basicForum')
// Connecting to db through mongoose

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// Adding in the body parser

app.use(morgan('dev'))
// Adding in morgan

app.get('/test', (req, res, next) => {
  res.send('Getting test')
})

app.post('/test', (req, res, next) => {
  res.send('Posting test')
})

app.use('/json', (req, res, next) => {
  res.status(200).json({message: 'It works!'})
})

// Test cases for the API

app.use('/posts', postsPath)

app.use('/', (req, res, next) => {
  res.sendfile('./views/index.html')
})

client.on('connection', function(socket) {
  socket.on('commentIn', function(data) {
    console.log(data.message, data.id)
    Post.findOne({
      _id: data.id
    }, function(err, post) {
      if (err)
        throw err
      var comments = post.comments
      comments.push({
        name:'user',
        message: data.message
      })
      Post.update({_id:data.id}, {comments: comments})
      post.save(function(err, result){
        if(err) throw err
        socket.emit('commentOut', {message: data.message, num: data.id})
      })
      console.log(post)
    })
  })
})
module.exports = app