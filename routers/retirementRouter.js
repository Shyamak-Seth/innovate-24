const router = require('express').Router()

router.get('/', (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('retirement', {user: req.user, applyForRet: true, pension: 2000})
})

module.exports = router