const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const foundUser = await User.findOne({email: req.user.email})
    const userPoints = foundUser.points
    const userLevel = foundUser.loyaltyLevel
    var userPercentage = 0
    const levelsConfig = {
        Bronze: 500,
        Silver: 1500,
        Gold: 3000
    }
    const previousConfig = {
        Bronze: 0,
        Silver: 500,
        Gold: 1500
    }
    if (userLevel == 'Platinum') {
        userPercentage = 100
    } else {
        userPercentage = Math.round(((userPoints - previousConfig[userLevel]) / (levelsConfig[userLevel] - previousConfig[userLevel])) * 100)
    }
    res.render('index', {user: req.user, percentage: userPercentage})
})

module.exports = router