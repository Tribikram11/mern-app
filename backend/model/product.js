const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, 'too much lengthy']
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'value should be greater than or equal to zero']
        },
        category: {
            type: String,
            required: true,
            enum: ['electronics', 'clothing', 'food']
        },
        stock: {
            type: Number,
            default: 0,
            min: [0,'Stock cannot be negative']
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;