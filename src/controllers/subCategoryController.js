const mongoose = require("mongoose")
const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
const ApiError = require('../utils/apiError')
const SubCategory = require("../models/subCategoryModel")

// @dec  get list of  subcategories
// @route  get  /api/v1/subcategory
// @access  public
exports.getSubCategories = asyncHandler(async(req,res,next)=>{
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page-1)*limit
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit).populate({path : 'category' , select : 'name-_id'})
    res.status(200).json({result : subCategories.length , page , limit , data : subCategories})
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