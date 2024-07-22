const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', (req, res) => {
    if (req.user.verified) return res.redirect('/')
    res.render('verify', {error: false})
})

router.get('/judgesTest', async (req, res) => {
    await User.updateOne({email: req.user.email}, {
        $set: {
            verified: true
        }
    })
    res.redirect('/')
})

module.exports = router