const express = require('express')
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dal = require('./dal');


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: null}
}))
app.use(function(req, res, next){ //Checks each req to see if logged in?
  if(req.session.usr) {
    req.isAuthenticated = true
  }
  else {
    req.isAuthenticated = false
  }
  console.log(req.isAuthenticated, 'session');
  next();
})


/////////////// ROUTES /////////////////////

app.get('/', function(req, res){
  if(req.isAuthenticated){
    app.redirect('admin')
  } else {
    res.render('index')
  }
})


app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login', function(req, res){
  const foundUser = dal.getUserByUsername(req.body.username);
  if(foundUser.password === req.body.password){
    req.session.usr = {name: foundUser.username}
    console.log(req.session);
    res.redirect('/admin')
  } else {
    res.send('incorrect login info')
  }
})

app.get('/signup', function(req, res){
  res.render('signup')
})

app.post('/signup', function(req, res){
  dal.addUser(req.body.newUsername, req.body.newPassword)
  res.redirect('/login');
})


app.get('/admin', function(req, res){
  const users = dal.getUsers();
  res.render('admin', { users: users })
})

app.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/');
})



app.listen(3000, function(req, res){
  console.log('App started on 3000!');
});
