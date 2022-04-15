import Product from '../models/Product'
import slugify from 'slugify';


export const create = async (req, res) => { // create product

    req.body.slug = slugify(req.body.name);
    try {
        const existProduct = await Product.findOne({ slug: req.body.slug }).exec();
        console.log(existProduct);
        if (existProduct) {
            return res.status(400).json({
                message: 'Product already exists'
            })
        }
        const product = await new Product(req.body).save()
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Thêm sản phẩm không thành công"
        })
    }
}

export const list = async (req, res) => { // get all
    // /product?limit=4
    // /product?sortBy=name&order=asc
    const limitNumber = 12
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'desc';

    try {
        const products = await Product.find({}).limit(limit).sort({ sortBy: order }).exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lấy list không thành công"
        })
    }
}
// Search
export const search = async (req, res) => {
    const search = req.query.s ? req.query.s : '';

    const regex = new RegExp(search, 'i');

    try {
        if (search == '') {
            const products = await Product.find().exec();
            res.json(products);
        } else {
            const products = await Product.find({ name: regex }).exec();
            res.json(products);
        }
    } catch (error) {
        res.status(400).json({
            message: "Search không thành công"
        })
    }
}
export const get = async (req, res) => { // get a product
    try {
        const products = await Product.findOne({ _id: req.params.id }).exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lấy sp không thành công"
        })
    }
}

export const remove = async (req, res) => { // delete product
    try {
        const products = await Product.findOneAndDelete({ _id: req.params.id }).exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Xoa sp that bai"
        })
    }
}
export const update = async (req, res) => { // update product
    const condition = { _id: req.params.id };
    req.body.slug = slugify(req.body.name);
    const update = req.body;
    const optional = { new: true }
    try {
        const products = await Product.findOneAndUpdate(condition, update, optional).exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Update sản phẩm không thành công"
        })
    }
}