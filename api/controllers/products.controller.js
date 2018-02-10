const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product.model');

exports.products_get_all = (req, res, next) => {
  Product.find()
  .select('name price _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          createdBy: doc.createdBy,
          request: {
            type: 'GET',
            url: '/products/' + doc._id
          }
        }
      })
    };
    
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
};

exports.products_get = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
};

exports.products_create = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    createdBy: req.userData.userId
  });
  
  product.save().then(result => {
    res.status(201).json({
      message: 'Product Created',
      product: {
        _id: result._id,
        name: result.name,
        price: result.price,
        createdBy: result.createdBy,
        request: {
          type: 'GET',
          url: '/products/' + result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

exports.products_update = (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops);
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Product.update({_id: id}, { $set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product delete',
      request: {
        type: 'POST',
        url: '/products',
        data: {name: 'String', price: 'Number'}
      }
    });
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
};