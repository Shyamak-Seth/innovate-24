require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash'),
    app = express(),
    PORT = process.env.PORT || 5000

const indexRouter = 

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URI, console.log('MONGODB CONNECTED'))

app.use('/', indexRouter)
