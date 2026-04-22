require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message:`Route ${req.url} not found`
    })
})

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
}) 

