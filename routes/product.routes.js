const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
const {getProducts} = require('../controllers/product.controller');


router.get('/', getProducts);

router.get('/:id');


module.exports = router;
