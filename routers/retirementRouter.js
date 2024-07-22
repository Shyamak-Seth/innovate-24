const userSchema = require('../schemas/userSchema')

const router = require('express').Router()


router.get('/', async (req,res) => {
    if (!req.user) return res.redirect('/login')

    var myPension = 0
    var pensionClaim = true
    var applyForRet = true

    if (req.user.loyaltyLevel == 'Bronze') {
        myPension = 0
    } else if (req.user.loyaltyLevel == 'Silver') {
        myPension = 3000
    } else if (req.user.loyaltyLevel == 'Gold') {
        myPension = 4000
    } else if (req.user.loyaltyLevel == 'Platinum') {
        myPension = 5000
    }
    
    if (req.user.pensionClaimed) {
        pensionClaim = false
    }

    if (req.user.retired) {
        applyForRet = false
    }

    



    res.render('retirement', {user: req.user, applyForRet: applyForRet, pension: myPension, message: '', pensionClaim: pensionClaim})
})

router.post('/claim', async (req, res) => {
    if (!req.user) return res.redirect('/login')

    var myPension = 0

    if (req.user.loyaltyLevel == 'Bronze') {
        myPension = 0
    } else if (req.user.loyaltyLevel == 'Silver') {
        myPension = 3000
    } else if (req.user.loyaltyLevel == 'Gold') {
        myPension = 4000
    } else if (req.user.loyaltyLevel == 'Platinum') {
        myPension = 5000
    }
    
    if (req.user.pensionClaimed) {
        // return res.render('retirement', {user: req.user, applyForRet: false, pension: myPension, message: "You have already claimed your pension.", pensionClam: false})
        return res.end({success: false, message: 'You have already claimed your pension'})
    }
    await userSchema.findOneAndUpdate({email: req.user.email}, {
        $set: {
            pensionClaimed: true
        }
    })
    // res.render('retirement', {user: req.user, applyForRet: false, pension: myPension, message: 'Successfully Claimed', pensionClaim: true})
    return res.json({success: true, message:'Successfully Claimed'})
})

router.post('/applyForRet', async (req,res) => {

    if (req.user.age < 60) {
        return res.json({success: false, message: 'You cannot apply for retirement as you are under 60 years.'})
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


    await userSchema.findOneAndUpdate({email: req.user.email}, {
        $set: {
            retired: true
        }
    })

    // res.render('retirement', {user: req.user, applyForRet: false, pension: myPension, message: 'You have now been retired.', pensionClaim: true})
    return res.json({success: true, message: 'You have now been retired.'})

})

module.exports = router