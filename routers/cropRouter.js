const router = require('express').Router(),
    User = require('../schemas/userSchema'),
    fs = require('fs'),
    path = require('path')

router.get('/new', (req, res) => {
    res.render('track', {error: false})
})

router.post('/new', async (req, res) => {
    try {
        const {crop} = req.body
        const foundUser = await User.findOne({email: req.user.email})
        const currentCrops = foundUser.crops
        for (let i = 0; i < foundUser.crops.length; i++) {
            if (foundUser.crops[i].name == crop) {
                return res.render('track', {error: 'Already tracking this crop!'})
            }
        }
        currentCrops.push({
            name: crop,
            harvest: 0,
            date: Number(new Date())
        })
        await User.updateOne({email: req.user.email}, {
            $set: {
                crops: currentCrops
            }
        })
        res.redirect(`/crop/view/${crop}`)     
    } catch (error) {
        res.json({success: false})
    }
})

router.get('/view', async (req, res) => {
    const foundUser = await User.findOne({email: req.user.email})
    const currentCrops = []
    for (let i = 0; i < foundUser.crops.length; i++) {
        currentCrops.push(foundUser.crops[i].name)
    }
    res.render('viewcrops', {crops: currentCrops})
})

router.get('/view/:id', async (req, res) => {
    const {id} = req.params
    const foundUser = await User.findOne({email: req.user.email})
    var isIdValid = false
    var foundCrop;
    for (let i = 0; i < foundUser.crops.length; i++) {
        if (foundUser.crops[i].name == id) {
            isIdValid = true
            foundCrop = foundUser.crops[i]
            break
        }
    }
    if (!isIdValid) return res.redirect('/')
    res.render('viewcrop', {crop: foundCrop})
})

router.get('/harvest', async (req, res) => {
    const foundUser = await User.findOne({email: req.user.email})
    const currentCrops = []
    for (let i = 0; i < foundUser.crops.length; i++) {
        currentCrops.push(foundUser.crops[i].name)
    }
    res.render('harvest', {crops: currentCrops, error: false})
})

router.post('/harvest', async (req, res) => {
    try {
        const foundUser = await User.findOne({email: req.user.email})
        const currentCrops = []
        for (let j = 0; j < foundUser.crops.length; j++) {
            currentCrops.push(foundUser.crops[j].name)
        }
        const pointsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'pointsConfig.json'), {
            encoding: 'utf8'
        }))
        const {crop, quantity} = req.body
        var totalPoints = 0
        for (let i = 0; i < pointsConfig.length; i++) {
            if (pointsConfig[i].crop == crop) {
                const currentCrop = pointsConfig[i]
                if (req.user.landSize < 1) {
                    totalPoints += 50
                } else if (req.user.landSize >= 1 && req.user.landSize < 2) {
                    totalPoints += 40
                } else if (req.user.landSize >= 2 && req.user.landSize < 4) {
                    totalPoints += 30
                } else if (req.user.landSize >= 4 && req.user.landSize < 10) {
                    totalPoints += 20
                } else {
                    totalPoints += 10
                }
                if (req.user.age < 30) {
                    totalPoints += 10
                } else if (req.user.age >= 30 && req.user.age < 45) {
                    totalPoints += 20
                } else {
                    totalPoints += 30
                }
                if (quantity < 500) {
                    totalPoints += 4
                } else if (quantity < 1000) {
                    totalPoints += 10
                } else if (quantity < 2500) {
                    totalPoints += 20
                } else if (quantity < 4000) {
                    totalPoints += 30
                } else if (quantity < 5000) {
                    totalPoints += 40
                } else {
                    totalPoints += 50
                }
                if (currentCrop.points) {
                    totalPoints += currentCrop.points
                }
                totalPoints += foundUser.points
                var loyaltyLevel
                if (totalPoints < 500) {
                    loyaltyLevel = 'Bronze'
                } else if (totalPoints < 1500) {
                    loyaltyLevel = 'Silver'
                } else if (totalPoints < 3000) {
                    loyaltyLevel = 'Gold'
                } else {
                    loyaltyLevel = 'Platinum'
                }
                await User.updateOne({email: req.user.email}, {
                    $set: {
                        points: totalPoints,
                        loyaltyLevel: loyaltyLevel
                    }
                })
                return res.redirect('/')
            }
        }     
        res.render('harvest', {crops: currentCrops, error: 'Something went wrong. Please try again.'}) 
    } catch (error) {
        console.log(error)
        res.redirect('/crop/harvest')
    }
})

module.exports = router