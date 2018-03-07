const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"

/*MongoClient.connect(url, function(err, db){
  if(err) throw err
  console.log('Connected to db')
  router.post('/', (req, res, next) => {
      var dbo = db.db('basicForum')
      var myobj = {name:req.body.name, message:req.body.message}
      dbo.collection('posts').insertOne(myobj, function(e, result){
        if(e) throw e
        console.log('1 document inserted')
        res.status(200).json({
          message:'Inserted a new post'
        })
        db.close()
      })
    })

  router.get('/', (req, res, next)=>{
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

  router.get('/:id', (req, res, next) => {
      const id = req.params.id
      res.status(200).json({
        message:'Getting single post',
        id: id
      })
    })
})
*/
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

router.post('/', (req, res, next)=>{
  MongoClient.connect(url, function(err,db){
    var myobj = {name: req.body.name, message: req.body.message}
    var dbo = db.db('basicForum')
    dbo.collection('posts').insertOne(myobj, function(e, result){
      if(e) throw e
      console.log('1 document inserted')
      db.close()
    })
  })
})
module.exports = router
