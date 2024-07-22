require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash'),
    app = express(),
    passportInit = require('./utils/passport-config'),
    {ensureAuthenticated, forwardAuthenticated} = require('./utils/authenticate'),
    PORT = process.env.PORT || 5000

const indexRouter = require('./routers/indexRouter'),
    loginRouter = require('./routers/loginRouter'),
    regRouter = require('./routers/regRouter'),
    reportRouter = require('./routers/reportRouter'),
    cropRouter = require('./routers/cropRouter'),
    retirementRouter = require('./routers/retirementRouter'),
    loyaltyRouter = require('./routers/loyaltyRouter'),
    perksRouter = require('./routers/perksRouter'),
    profileRouter = require('./routers/profileRouter'),
    jobRouter = require('./routers/jobRouter')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
passportInit(passport)
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGO_URI, console.log('MONGODB CONNECTED'))

app.use('/', indexRouter)
app.use('/login', forwardAuthenticated, loginRouter)
app.use('/register', forwardAuthenticated, regRouter)
app.use('/report', ensureAuthenticated, reportRouter)
app.use('/crop', ensureAuthenticated, cropRouter)
app.use('/level', ensureAuthenticated, loyaltyRouter)
app.use('/retirement', ensureAuthenticated, retirementRouter)
app.use('/perks', ensureAuthenticated, perksRouter)
app.use('/job', ensureAuthenticated, jobRouter)
app.use('/profile', ensureAuthenticated, profileRouter)

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.log(err)
        return res.redirect('/login')
    });
})


app.listen(PORT, console.log(`Server listening on port ${PORT}`))