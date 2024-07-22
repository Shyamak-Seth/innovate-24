const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const foundUser = await User.findOne({email: req.user.email})
    const userPoints = foundUser.points
    const userLevel = foundUser.loyaltyLevel
    var userPercentage = 0
    const levelsConfig = {
        Bronze: 500,
        Silver: 1500,
        Gold: 3000
    }
    if (userLevel == 'Platinum') {
        userPercentage = 100
    } else {
        userPercentage = Math.round((userPoints / levelsConfig[userLevel]) * 100)
    }
    res.render('level', {level: userLevel, percentage: `${userPercentage}%`})
})

module.exports = router