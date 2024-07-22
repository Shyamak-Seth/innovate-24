const router = require('express').Router(),
    Report = require('../schemas/reportSchema.js')

router.get('/', (req, res) => {
    res.render('report', {message: false})
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const foundReport = await Report.findById(id)
        if (!foundReport) {
            return res.redirect('/')
        } else {
            res.render('indiReport', {report: foundReport})
        }     
    } catch (error) {
        res.end('There was an error. Please try again.')
    }
})

router.post('/', async (req, res) => {
    try {
        const {subject, body} = req.body
        if (!subject || !body) return res.render('report', {message: 'Please enter the subject and the body!'})
        const newReport = new Report({
            fname: req.user.fname,
            lname: req.user.lname,
            email: req.user.email,
            subject: subject,
            body: body
        })
        await newReport.save()
        // res.redirect('/report/' + newReport.id)
        res.render('report', {message: 'Reported Successfully'})      
    } catch (error) {
        res.end('There was an error. Please try again.')
    }
})

module.exports = router