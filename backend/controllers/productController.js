const Product = require('../model/product');

// get products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ price: 1 });
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
}


// get products by id
const getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// create product

const createProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const product = await Product.create({ name, price, category, stock });

        res.status(201).json({
            success: true,
            data: product
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Product already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

// update 


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// delete
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}


module.exports = {getAllProducts, createProduct, getProductsById, updateProduct, deleteProduct};
