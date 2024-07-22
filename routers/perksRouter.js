const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const foundUser = await User.findOne({email: req.user.email})
    const allPerks = ['Job Marketplace', 'Workshops']
    if (foundUser.loyaltyLevel != 'Bronze') {
        allPerks.push('HYV Seeds')
        allPerks.push('Crop Insurance')
        if (foundUser.loyaltyLevel != 'Silver') {
            allPerks.push('Equipment Insurance')
            allPerks.push('Vehicle Insurance')
            if (foundUser.loyaltyLevel != 'Gold') {
                allPerks.push('Life Insurance')
            }
        }
    }
    res.render('perks', {perks: allPerks})
})

module.exports = router