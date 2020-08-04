const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(myFakeMiddleware)

function myFakeMiddleware(req,res,next){
  console.log('El fakeMiddleware se ejecutó')
  next()
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.get('/', (req,res)=>{
  res.render('index')
})

app.get('/ironhack/:city/teachers/:course', (req,res)=>{
  res.send(req.params)
})

app.get('/search',(req,res)=>{
  res.send(req.query)
})

app.get('/get-user-info', (req,res)=>{
  res.render('user-info-form')
})

app.get('/display-user-info',(req,res)=>{
  let {name, age, superhero} = req.query

  res.send(`
    Your name is: ${name}
    Your age is: ${age}
    Your favorite superhero is: ${superhero}
  `)
  
})

app.get('/login', (req,res)=>{
  res.render('login')
})

app.get('/welcome', (req,res)=>{
  res.render('welcome')
})

app.post('/login', (req, res) => {
  // res.send(req.body)
  let { email, password } =req.body
  if(email == 'ironhacker@gmail.com' && password == 'esnueva123' ){
    res.redirect('/welcome')
  }else{
    res.render('login')
  }

  //res.redirect('/') redirecciona
})

app.get('/test', (req, res) => {
  res.send("We made it to test!");
})



app.listen(3000, ()=>{
  console.log(`listen on: http://localhost:3000`)
})