import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
//import {PAGINATION_LIMIT, CAROUSEL_PRODUCT_SIZE} from '../constants.js'

//@desc     fetch all products
//@route    GET /api/products
//@acess    public (could be private or private admin)
const getProducts = asyncHandler(async (req, res) => {
    
    //for pagination, set pageSize (products in a page), and
    //current page number to display-get from req query 
    // or set it to 1
    const pageSize = process.env.PAGINATION_LIMIT
    const page = Number(req.query.pageNumber) || 1

    //get search keyword for product name from req.query
    //regex will match the keyword in anywhere in product name
    const keyword = req.query.keyword ? //if keyword exist in query
        {name: {$regex: req.query.keyword, // set keyword value to it
        $options: 'i'}} // make it case insensitive
        : {} //otherwise, set as empty object

    //get total products count, and products 
    //if there is search keyword, count for keyword
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword})
        .limit(pageSize)//get limited number of products
        
        //skip previous pages. pageSize * (currrpage -1)
        .skip(pageSize * (page - 1))//skip all previous pages
    
        //return products (with limit & skip), page number, total pages    
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})

//@desc     fetch single product
//@route    GET /api/products/:id
//@acess    public 
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {return res.json(product)}
    else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

//@desc     create a new product
//@route    POST /api/products
//@acess    private and admin 
const createProduct = asyncHandler(async (req, res) => {
    //when admin clicks on ‘create product’ button, a product with sample data is created. 
    //Then admin can edit the product fields
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',//sample image from frontend/images
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
    })
    const createdProduct = await product.save()
    res.status(201).json({message: 'Product created'})
})

//@desc     update a products
//@route    PUT /api/products/:id
//@acess    private and admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name,price,description,image,brand,
        category,countInStock} =  req.body
    
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json({message: 'Product updated'})
     }  else {
        res.status(404)
        throw new Error('Resource not found')
    }
     
     
})

//@desc     delete a products
//@route    DELETE /api/products/:id
//@acess    private and admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted'})
     }  else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

//@desc     create a new Review
//@route    POST /api/products/:id/reviews
//@acess    private (only logged in users) 
const createProductReview = asyncHandler(async (req, res) => {

    //submitted review will have rating and comment
    const {rating, comment} = req.body 

    const product = await Product.findById(req.params.id)
    if(product) {
        //find a review by same user 
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString())
        
        if(alreadyReviewed) {//if such review found
            res.status(400)
            throw new Error('Product already reviewed by this user')
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        
        //recalculate rating as average
        product.rating = product.reviews.reduce(
            (acc, review) => acc + review.rating, 0) 
            / product.reviews.length
        

        await product.save()
        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

//@desc     get top rating products
//@route    GET /api/products/top
//@acess    public 
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
        .sort({rating: -1}) //sort on rating descending
        .limit(process.env.CAROUSEL_PRODUCT_SIZE) // limit to 3 products
        
    res.status(200).json(products)
       
})

export {getProducts, getProductById, createProduct, 
    updateProduct, deleteProduct, createProductReview, 
    getTopProducts};