const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');

router.get('/', OrdersController.orders_get_all);

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order created'
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    id: id,
    message: 'Order'
  });
});


module.exports = router