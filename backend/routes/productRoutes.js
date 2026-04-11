const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/',getAllProducts);
router.post('/',createProduct);

router.get('/:id',getProductsById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;