const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products.controller');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, ProductsController.products_get_all);

router.post('/', checkAuth, ProductsController.products_create);

router.get('/:productId', checkAuth, ProductsController.products_get);

router.patch('/:productId', checkAuth, ProductsController.products_update);

router.delete('/:productId', checkAuth, ProductsController.products_delete);

module.exports = router