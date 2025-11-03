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
        const { name, price, description, image, category } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: 'Name, price, description, and category are required' });
        }

        const product = await Product.create({ name, price, description, image, category });
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

        const { name, price, description, image, category } = req.body;
        
        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: 'Name, price, description, and category are required' });
        }

        const product = await Product.findByIdAndUpdate(id, { name, price, description, image, category }, { new: true });
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
const sortProductsHandler = async (req, res) => {
    try {
        const { sortBy } = req.query;
        
        // Map sortBy values to MongoDB sort objects
        let sortObject = {};
        switch (sortBy) {
            case 'latest':
                sortObject = { createdAt: -1 }; // newest first
                break;
            case 'price-low':
                sortObject = { price: 1 }; // ascending
                break;
            case 'price-high':
                sortObject = { price: -1 }; // descending
                break;
            case 'name':
                sortObject = { name: 1 }; // A to Z
                break;
            default:
                sortObject = { createdAt: -1 }; // default to latest
        }
        
        const products = await Product.find().sort(sortObject);
        res.status(200).json({ data: products });
    } catch (error) {
        console.error('Error sorting products', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const searchProductsHandler = async (req, res) => {
    try {
        const { search } = req.query;
        const products = await Product.find({ name: { $regex: search, $options: 'i' } });
        res.status(200).json({ data: products });
    } catch (error) {
        console.error('Error searching products', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCategoryCountsHandler = async (req, res) => {
    try {
        const categories = ['earrings', 'necklaces', 'bracelets', 'rings', 'jewellery-sets'];
        const counts = await Promise.all(
            categories.map(async (category) => {
                const count = await Product.countDocuments({ category });
                return { category, count };
            })
        );
        
        const totalCount = await Product.countDocuments();
        
        res.status(200).json({ 
            data: {
                categories: counts,
                total: totalCount
            }
        });
    } catch (error) {
        console.error('Error getting category counts', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductsByCategoryHandler = async (req, res) => {
    try {
        const { category } = req.params;
        const { sortBy } = req.query;
        
        let query = {};
        if (category !== 'all') {
            query.category = category;
        }
        
        // Map sortBy values to MongoDB sort objects
        let sortObject = {};
        switch (sortBy) {
            case 'latest':
                sortObject = { createdAt: -1 };
                break;
            case 'price-low':
                sortObject = { price: 1 };
                break;
            case 'price-high':
                sortObject = { price: -1 };
                break;
            case 'name':
                sortObject = { name: 1 };
                break;
            default:
                sortObject = { createdAt: -1 };
        }
        
        const products = await Product.find(query).sort(sortObject);
        res.status(200).json({ data: products });
    } catch (error) {
        console.error('Error getting products by category', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getProductHandler,
    postProductHandler,
    getProductByIdHandler,
    patchProductHandler,
    deleteProductHandler,
    sortProductsHandler,
    searchProductsHandler,
    getCategoryCountsHandler,
    getProductsByCategoryHandler,
}