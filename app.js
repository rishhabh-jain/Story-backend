const mongoose = require("mongoose")
const passport = require("passport")
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()
connectDB()
//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://story-frontend.web.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  )
  res.header('Access-Control-Allow-Credentials' , 'true ')
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

require('./config/passport')(passport)

const PORT = process.env.PORT || 5000  ;


// session middleware

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/' , require('./routes/index.js'))
app.use('/auth' ,require('./routes/auth'))
app.use('/stories' ,require('./routes/story'))

app.listen(
  PORT,
  console.log(`Server running  on port ${PORT}`)
)
