const router = require('express').Router()

router.get('/', (req, res) => {
    if (!req.user) return res.redirect('/login')
    var myPension = 0
    if (req.user.age < 60) {
        return res.render('retirement', {user: req.user, applyForRet: false, pension: 0})
    }
    if (req.user.loyaltyLevel == 'Bronze') {
        myPension = 0
    } else if (req.user.loyaltyLevel == 'Silver') {
        myPension = 3000
    } else if (req.user.loyaltyLevel == 'Gold') {
        myPension = 4000
    } else if (req.user.loyaltyLevel == 'Platinum') {
        myPension = 5000
    }
    res.render('retirement', {user: req.user, applyForRet: true, pension: myPension})
})

module.exports = router