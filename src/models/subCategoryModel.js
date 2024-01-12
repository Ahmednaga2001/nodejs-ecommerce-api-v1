const mongoose = require("mongoose")
 const subCategorySchema =  mongoose.Schema({
    name : {
        type : String,
        required : [true , 'SubCategory required'],
        trim : true,
        unique : [true , 'SubCategory must be unique'],
        minlength : [3 , 'Too short SubCategory name'],
        maxlength : [32 , 'Too long SubCategory name']
    },
    slug : {
        type : String,
        lowercase : true
    },
    image : String,
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'Category',
        required : [true , 'SubCategory must be belong to parent category']
    }
    
 },{timestamps : true})

 const SubCategory = mongoose.model('SubCategory' , subCategorySchema)
 module.exports = SubCategory