const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
// Importing necessary modules

mongoose.connect('mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@cluster0-kxvjp.mongodb.net/test?retryWrites=false')
// Connecting to db

router.get('/', (req, res, next) => {
  console.log('Getting posts...')
  Post.find(function(err, posts){
    if(err) throw err
    //console.log(posts)
    res.status(200).json({
      message: 'All the posts',
      posts: posts
    })
  })
})

router.post('/delete', (req, res, next)=>{
  //console.log(req.body)
  Post.remove({_id: req.body.id}, function(err){
    if(err) {
      throw err
      console.log(err)
    }
    res.status(200).json({
      result: req.body
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
