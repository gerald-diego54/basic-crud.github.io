const { request } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/control');


router.get('/', (request, response) => {
    response.render('login');
});

router.get('/register', (request, response) => {
    response.render('customer');
});

// router.get('/record', (request, response) => {
//     response.render('records');
// });
router.get('/record', controller.readRecords);

// router.get('/updates', (request, response) => {
//     response.render('update');
// });

router.get('/index', (request, response) => {
    response.render('index');
});

module.exports = router;