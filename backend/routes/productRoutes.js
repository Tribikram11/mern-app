const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, authorize} = require('../middleware/authMiddleware');

router.get('/',getAllProducts);
router.post('/',protect, createProduct);

router.get('/:id',getProductsById);
router.put('/:id',protect, updateProduct);
router.delete('/:id',protect, authorize('admin'), deleteProduct);

module.exports = router;