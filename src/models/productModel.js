const mongoose = require("mongoose")
const productSchema =  mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true , 'Product title required'],
        minlength : [3 , 'Too short product title'],
        maxlength : [100 , 'Too long product title']
    },
    slug : {
        type : String,
        lowercase : true
    },
    description : {
        type : String,
        required : [true , 'Product decription required'],
        trim : true,
        minlength : [20 , 'Too short product description'],
    },
    price: {
        type: Number,
        required: [true, 'Product price required'],
        max: [200000, 'Product price must be less than or equal to 20']
    },
    
    priceAfterDiscount : {
        type : Number
    },
    quantity : {
        type : Number,
        required : [true , 'Product quantity required']
    },
    sold : {
        type : Number,
        default : 0
    },
    colors : [String],
    imageCover : {
        type : String,
        required : [true , 'Product imageCover required']
    },
    images : [String],
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'Category',
        required : [true , 'Product must be belong to category']
    },
    subCategories : [{
        type : mongoose.Schema.ObjectId,
        ref : 'SubCategory',

    }],
    brand : {
        type : mongoose.Schema.ObjectId,
        ref : 'Brand',

    },
    ratingsAverage : {
        type : Number,
        min : [1 , 'product rating must be equal or above 1.0'],
        max : [5 , 'product rating must be equal or below 5.0']

    },
    ratingsQuantity : {
        type : Number,
        default : 0
    }


}, {timestamps : true})

module.exports = mongoose.model('Product' , productSchema)