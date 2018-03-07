const express = require('express')
const app = express()
const postsPath = require('./api/routes/posts')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/test', (req, res, next)=>{
  res.send('Getting test')
})

app.post('/test', (req, res, next)=>{
  res.send('Posting test')
})
app.use('/json', (req, res, next)=>{
  res.status(200).json({
    message: 'It works!'
  })
})

app.use('/posts', postsPath)

app.use('/', (req, res, next) =>{
  res.sendfile('./views/index.html')
})

module.exports = app
