const passport = require('passport')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else res.redirect('/login');
}

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    else{
      res.redirect('/')
    }
}

function ensureKyc(req, res, next) {
    if (req.user.kyc) {
        return next()
    } else {
      res.redirect('/kyc')
    }
}

function ensureVerified(req, res, next) {
  if (req.user.verified) {
      return next()
  } else {
      res.redirect('/verify')
  }
}

module.exports = { ensureAuthenticated, forwardAuthenticated, ensureKyc, ensureVerified};