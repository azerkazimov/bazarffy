const express = require('express');
const router = express.Router();

const {
    getProductHandler,
    postProductHandler,
    getProductByIdHandler,
    patchProductHandler,
    deleteProductHandler
} = require('../controllers/product.controller');



router.route('/').get(getProductHandler).post(postProductHandler);
router.route('/:id').get(getProductByIdHandler).put(patchProductHandler).delete(deleteProductHandler);

module.exports = router;