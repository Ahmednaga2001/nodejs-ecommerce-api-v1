const Category = require("../models/categoryModel")
const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
const ApiError = require('../utils/apiError')


// @dec  get list of  category
// @route  get  /api/v1/categories
// @access  public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page - 1) * limit
    const categories = await Category.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: categories.length, page: page, limit: limit, data: categories })
})

// @dec  get specific  category
// @route  get  /api/v1/categories/:id
// @access  public
exports.getCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params
    console.log(id)
    const category = await Category.findById(id)
    if (!category) {
        // res.status(404).json({ message: `No category for this id ${id}` })
        return next(new ApiError(404 , `No category for this id ${id}`))
    }
    res.status(200).json({ data: category })
})

// @dec  create category
// @route  post  /api/v1/categories
// @access  private
exports.createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create({
        ...req.body,
        slug: slugify(req.body.name)
    })
    res.status(201).json({ status: 'success', data: category })
})

// @dec  update specific category
// @route  patch  /api/v1/categories/:id
// @access  private
exports.updateCategory = asyncHandler(async (req, res , next) => {
    const { id } = req.params
    const category = await Category.findOneAndUpdate({ _id: id }, { ...req.body, slug: slugify(req.body.name) }, {new : true})
    if (!category) {
        // res.status(404).json({ message: `No category for this id ${id}` })
        return next(new ApiError(404 , `No category for this id ${id}`))
    }
    res.status(200).json({ data: category })
})

// @dec  delete specific category
// @route  delete  /api/v1/categories/:id
// @access  private
exports.deleteCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const category = await Category.findByIdAndDelete(id)
    if (!category) {
        return next(new ApiError(404 , `No category for this id ${id}`))
    }
    res.status(204).send()
})