const express = require('express')
const { getAllData } = require('../controllers/main.controller');

const router = express.Router()
router.get('/data',getAllData)


module.exports = router
