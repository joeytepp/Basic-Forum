const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
// Importing necessary modules

mongoose.connect('mongodb://localhost:27017/basicForum')
// Connecting to db

router.get('/', (req, res, next) => {
  console.log('Getting posts...')
  Post.find(function(err, posts){
    if(err) throw err
    console.log(posts)
    res.status(200).json({
      message: 'All the posts',
      posts: posts
    })
  })
})

router.post('/', (req, res, next)=>{
  var newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    message: req.body.message,
    comments: []
  })

  newPost.save(function(err, result){
    if(err) throw err
    res.status(200).json({
      message: 'Made a new post',
      posts: newPost
    })
  })
}) // Handling POST requests for new posts

router.post('/comment/:postID', (req, res, next) => {
  var id = req.params.postID
  var name = req.body.name
  var message = req.body.message
  Post.findOne({_id: id}, function(err, post){
      var comments = post.comments
      comments.push({
        name: name,
        message: message
      })
      Post.update({_id: id}, {
        comments: comments
      })
      post.save(function(err, result){
        if(err) throw err
        res.status(200).json({
          message:'Added a new comment',
          post: post
      })
    })
  })
}) // Handling the posting of comments


module.exports = router
/*
// Getting all the posts from db
router.get('/', (req, res, next)=>{
  MongoClient.connect(url, function(err,db){
    var dbo = db.db('basicForum')
    dbo.collection('posts').find({}).toArray(function(e, result){
      if(e) throw e
      res.status(200).json({
        message:'All the posts',
        posts: result
      })
      db.close()
    })
  })
})

router.post('/:postNum', (req, res, next) =>{
  var num = parseInt(req.params.postNum)
  MongoClient.connect(url, function(err, db){
    var dbo = db.db('basicForum')
    dbo.collection('posts').find({num: num}).comments.push(req.body.comment)
  })
  res.status(200).json({
    message:'Comments',
    posts: num
  })
})

// Adding a new post to db
router.post('/', (req, res, next)=>{
  MongoClient.connect(url, function(err,db){
    var myobj = {name: req.body.name, message: req.body.message, num: req.body.num, comments: []}
    var dbo = db.db('basicForum')
    dbo.collection('posts').insertOne(myobj, function(e, result){
      if(e) throw e
      console.log('1 document inserted')
      db.close()
    })
  })
})
module.exports = router
*/
