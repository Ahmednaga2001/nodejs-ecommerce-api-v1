const mongoose = require("mongoose")
const brandSchema = mongoose.Schema({
    name : {
        type : String,
        trim :true,
        unique : [true , 'Brand must be unique'], 
        required : [true , 'Brand required'],
        minlenght : [3 , 'Too short name'],
        maxlength : [32 , 'Too long name']
    },
    slug : {
        type : String,
        lowercase : true

    },
    image : String
},{timestamps : true})

module.exports = mongoose.model('Brand' , brandSchema)