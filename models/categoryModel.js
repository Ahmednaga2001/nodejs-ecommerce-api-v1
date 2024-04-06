const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Category required'],
        trim : true,
        unique : [true , 'Category must be unique'],
        minlength : [2 , 'Too short category name'],
        maxlength : [32 , 'Too long category name']
    },
    slug : {
        type : String,
        lowercase : true
    },
    image:String
},{timestamps : true})

const Category = mongoose.model('Category' , categorySchema)
module.exports = Category