const asynHandler = require("express-async-handler")
const slugify = require("slugify")
const ApiError = require('../utils/apiError')
const Product = require("../models/productModel")
// @dec  get list of  products
// @route  get  /api/v1/products
// @access  public
exports.getProducts = asynHandler(async(req,res)=>{
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page-1)*limit
    const products = await Product.find({}).skip(skip).limit(limit).populate({path : 'category' , select : "name -_id"})
    res.status(200).json({result : products.length , page , limit , data : products})
})

// @dec  get specific  product
// @route  get  /api/v1/products/:id
// @access  public
exports.getProduct = asynHandler(async(req,res,next)=>{
    const {id} = req.params
    const product = await Product.findById(id).populate({path : 'category' , select : "name -_id"})
    if (!product) {
        return next(new ApiError(404 , `No product for this id ${id}`))
    }
    res.status(200).json({ data: product })
})

// @dec  delete specific product
// @route  delete  /api/v1/products/:id
// @access  private
exports.deleteProduct = asynHandler(async(req,res,next)=>{
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
        return next(new ApiError(404 , `No product for this id ${id}`))
    }
    res.status(204).send()
})

// @dec  create product
// @route  post  /api/v1/products
// @access  private
exports.createProduct = asynHandler(async(req,res)=>{
    console.log("ahemed naga")

    const product = await Product.create({
        ...req.body,
        slug : slugify(req.body.title)
    })
    res.status(201).json({status : "success" , data : product})
})

// @dec  update specific product
// @route  patch  /api/v1/products/:id
// @access  private
exports.updateProduct = asynHandler(async(req,res,next)=>{
    const {id} = req.params
    if(req.body.title){
        req.body.slug = slugify(req.body.title)

    }
    const product = await Product.findByIdAndUpdate({_id : id},{...req.body} , {new : true})

    if (!product) {
        return next(new ApiError(404 , `No product for this id ${id}`))
    }
    res.status(200).json({ data: product })
})