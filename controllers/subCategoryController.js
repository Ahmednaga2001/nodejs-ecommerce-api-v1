const mongoose = require("mongoose")
const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
const ApiError = require('../utils/apiError')
const SubCategory = require("../models/subCategoryModel")
const ApiFeatures = require("../utils/apiFeatures")

// @dec  get list of  subcategories
// @route  get  /api/v1/subcategory
// @access  public
exports.getSubCategories = asyncHandler(async(req,res,next)=>{
    const apiFeatures = new ApiFeatures(SubCategory.find(),req.query).paginate().filter().sort().limitFields().search()
    const subCategories = await apiFeatures.mongooseQuery
    res.status(200).json({result : subCategories.length, data : subCategories})
})
// @dec  get specific  subcategory
// @route  get  /api/v1/subcategories/:id
// @access  public
exports.getSubCategory = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const subCategory = await SubCategory.findById(id)
    if (!subCategory) {
        return next(new ApiError(404 , `No subCategory for this id ${id}`))
    }
    res.status(200).json({ data: subCategory })
})
// @dec  create csubategory
// @route  post  /api/v1/subcategories
// @access  private
exports.createSubCategory = asyncHandler(async(req,res,next)=>{
    console.log(req.body)
    const subCategory = await SubCategory.create({...req.body , slug : slugify(req.body.name)})
    res.status(201).json({ status: 'success', data: subCategory })

})
// @dec  update specific subcategory
// @route  patch  /api/v1/subcategories/:id
// @access  private
exports.updateSubCategory = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const subCategory = await SubCategory.findByIdAndUpdate({_id : id},{...req.body , slug : slugify(req.body.name)},{new : true})
    if (!subCategory) {
        return next(new ApiError(404 , `No SubCategory for this id ${id}`))
    }
    res.status(200).json({ data: subCategory })
})
// @dec  delete specific subcategory
// @route  delete  /api/v1/subcategories/:id
// @access  private

exports.deleteSubCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const subCategory = await SubCategory.findByIdAndDelete(id)
    if (!subCategory) {
        return next(new ApiError(404 , `No SubCategory for this id ${id}`))
    }
    res.status(204).send()
})