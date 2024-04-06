const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
const ApiError = require('../utils/apiError')
const Brand = require("../models/brandModel")
const ApiFeatures = require("../utils/apiFeatures")


// @dec  get list of  brand
// @route  get  /api/v1/brands
// @access  public
exports.getBrands = asyncHandler(async(req,res)=>{
    const apiFeatures = new ApiFeatures(Brand.find(),req.query).paginate().filter().sort().limitFields().search()
    const brands = await apiFeatures.mongooseQuery
    res.status(200).json({result : brands.length, data : brands})

})

// @dec  get specific  brand
// @route  get  /api/v1/brands/:id
// @access  public
exports.getBrand = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const brand = await Brand.findOne({_id : id})
    if (!brand) {
        return next(new ApiError(404 , `No brand for this id ${id}`))
    }
    res.status(200).json({ data: brand })
})

// @dec  delete specific brand
// @route  delete  /api/v1/brands/:id
// @access  private
exports.deleteBrand = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const brand = await Brand.findByIdAndDelete(id)
    if (!brand) {
        return next(new ApiError(404 , `No brand for this id ${id}`))
    }
    res.status(200).json()
})

// @dec  create brand
// @route  post  /api/v1/brands
// @access  private
exports.createBrand = asyncHandler(async(req,res)=>{
    const brand = await Brand.create({
        ...req.body,
        slug : slugify(req.body.name)
    })
    return res.status(201).json({status : "success" ,data : brand})

})

exports.updateBrand = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const brand = await Brand.findByIdAndUpdate({_id : id} , {...req.body , slug : slugify(req.body.name)} , {new : true})
    if (!brand) {
        return next(new ApiError(404 , `No brand for this id ${id}`))
    }
    return res.status(200).json({ data: brand })
})