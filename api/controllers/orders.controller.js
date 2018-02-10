exports.orders_get_all = (res, req, next) => {
  res.status(200).json({
    message: 'Orders'
  });
};