const router = require('express').Router(),
    User = require('../schemas/userSchema'),
    Job = require('../schemas/jobSchema')

router.get('/', async (req, res) => {
    const allJobs = await Job.find({})
    if (req.query.success) {
        res.render('jobs', {jobs: allJobs, success: true})
    } else {
        res.render('jobs', {jobs: allJobs, success: false})      
    }
})

router.get('/new', (req, res) => {
    res.render('newJob', {error: false})
})

router.post('/new', async (req, res) => {
    const {job, salary, daysPerWeek, location} = req.body
    if (!job || !salary || !daysPerWeek || !location) {
        return res.render('newJob', {error: 'Please enter all the details!'})
    }
    const newJob = new Job({
        for: req.user.email,
        salary: Number(salary),
        job: job,
        daysPerWeek: Number(daysPerWeek),
        location: location
    })
    await newJob.save()
    res.redirect('/job')
})

router.post('/apply/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Job.findByIdAndUpdate(id, {
            $set: {
                takenBy: req.user.email
            }
        })
        res.redirect('/job?success=true')
    } catch (error) {
        console.log(error)
        res.redirect('/job')
    }
})

module.exports = router