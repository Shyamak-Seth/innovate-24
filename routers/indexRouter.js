const router = require('express').Router()

router.get('/', (req, res) => {
    res.end('hello')
})

module.exports = router