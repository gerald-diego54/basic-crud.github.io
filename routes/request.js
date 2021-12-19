const express = require('express');
const router = express.Router();
const controller = require('../controllers/control');

router.post('/register', controller.register);
router.post('/login', controller.log_in); 
// router.get('/record', controller.record);    
router.get('/updates/:email', controller.updates);  
router.post('/update_customer', controller.update_customer);
router.post('/index', controller.index);    
router.get('/delete/:email', controller.delete);

module.exports = router;