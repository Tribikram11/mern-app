const connectDB = require('./db');
const product = require('./model/product');
require('dotenv').config();

const createProduct = async(data) => {
    try {
        const newProduct = await product.create(data);
        console.log("product created", newProduct);
        return newProduct;
    } catch (error) {
        console.error('Create failed:', error.message);
    }
    
}

const getAllProducts = async () => {
    try {
        const findProducts = await product.find().sort({ price: 1 })
        console.log("sorted order", findProducts)
    } catch (error) {
        console.error('GetAll failed:', error.message);
    }
}

const getProductById = async (id) => {
    try {
        const product1 = await product.findById(id);
        console.log("product by id", product1)
    } catch (error) {
        console.error('product not listed', error.message);
    }
}

const updateProduct = async (id, update) => {
    try {
        const updateProduct = await product.findByIdAndUpdate(
        id,
        update,
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
    console.log('updated product', updateProduct);
    } catch (error) {
        console.error('update failed:', error.message);
    }
    
}

const deleteProduct = async (id) => {
    try{
    const deleteProduct = await product.findByIdAndDelete(id)
    console.log('product deleted')

    } catch (error) {
        console.error('delete failed:', error.message);
    }
}

const runTest = async () => {
    await connectDB();

    const p1 = await createProduct({
        name: 'shirt',
        price: 399,
        category: 'clothing',
        stock: 50
    })
    const p2 = await createProduct({
        name: 'pant',
        price: 799,
        category: 'clothing',
        stock: 30
    })

    await getAllProducts();
    await getProductById(p1._id);
    await updateProduct(p1._id, { price: 199 });
    await deleteProduct(p1._id);

    process.exit(0)
}


runTest()