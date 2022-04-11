import Category from '../models/Category'
import slugify from 'slugify';
import Product from '../models/Product';


export const create = async (req, res) => { // create product
    req.body.slug = slugify(req.body.name);
    try {
        const category = await new Category(req.body).save()
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Thêm danh mục không thành công"
        })
    }
}

export const list = async (req, res) => { // get all
    try {
        const categories = await Category.find().exec();
        res.json(categories);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi"
        })
    }
}
export const read = async (req, res) => { // get all
    try {
        const category = await Category.findOne({ slug: req.params.slug }).exec();
        const products = await Product.find({ category: category }).populate('category').select('-category').exec();

        res.json({
            category, products
        });
    } catch (error) {
        res.status(400).json({
            message: "Lỗi k tìm đc"
        })
    }
}
// delete category and all product of category
export const remove = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ slug: req.params.slug }).exec();
        const products = await Product.deleteMany({ category: category }).exec();
        res.json({
            category, products
        });
    } catch (error) {
        res.status(400).json({
            message: "Xoa danh muc that bai"
        })
    }
}
// Update category
export const update = async (req, res) => { // update product
    const condition = { slug: req.params.slug };
    req.body.slug = slugify(req.body.name);
    const update = req.body;
    const optional = { new: true }
    try {
        const category = await Category.findOneAndUpdate(condition, update, optional).exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Update sản phẩm không thành công"
        })
    }
}