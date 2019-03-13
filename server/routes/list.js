const express = require('express');
const router = express.Router();
const List = require('../controllers/list');
const isLogin = require('./isLogin');

router.get('/allitems', isLogin, List.getAllItems);
router.post('/newitem', isLogin, List.addItem);
router.patch('/item', isLogin, List.updateItem);
router.delete('/item', isLogin, List.deleteItem);

module.exports = router;