const express = require('express');
const router = express.Router();

const {
    getProductHandler,
    postProductHandler,
    getProductByIdHandler,
    patchProductHandler,
    deleteProductHandler,
    sortProductsHandler,
    searchProductsHandler,
    getCategoryCountsHandler,
    getProductsByCategoryHandler
} = require('../controllers/product.controller');



router.route('/').get(getProductHandler).post(postProductHandler);
router.route('/sort').get(sortProductsHandler);
router.route('/search').get(searchProductsHandler);
router.route('/categories/counts').get(getCategoryCountsHandler);
router.route('/category/:category').get(getProductsByCategoryHandler);
router.route('/:id').get(getProductByIdHandler).put(patchProductHandler).delete(deleteProductHandler);
module.exports = router;