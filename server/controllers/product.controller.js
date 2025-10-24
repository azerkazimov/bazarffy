const Product = require('../model/product.model');

const getProductHandler = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products });
    } catch (error) {
        console.error('Error getting products', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const postProductHandler = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Name, price, and description are required' });
        }

        const product = await Product.create({ name, price, description, image });
        res.status(201).json({ data: product });
    } catch (error) {
        console.error('Error creating product', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getProductByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        console.error('Error getting product by id', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const patchProductHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, price, description, image } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, price, description, image });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        console.error('Error updating product', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const deleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getProductHandler,
    postProductHandler,
    getProductByIdHandler,
    patchProductHandler,
    deleteProductHandler,
}