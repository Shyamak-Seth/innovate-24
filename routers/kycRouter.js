const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const foundUser = await User.findOne({email: req.user.email})
    if (foundUser.kyc) return res.redirect('/')
    res.render('kyc', {error: false, user: req.user})
})

router.post('/', async (req, res) => {
    const {age, landSize, landDocument, aadharDocument} = req.body
    if (!age || !landSize || !landDocument || !aadharDocument) {
        return res.render('kyc', {error: 'Please enter all the details!'})
    }
    await User.updateOne({email: req.user.email}, {
        $set: {
            age: Number(age),
            landSize: Number(landSize),
            kyc: true
        }
    })
    res.redirect('/verify')
})

module.exports = router