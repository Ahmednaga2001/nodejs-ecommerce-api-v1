const express = require('express')
const app = express()

const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()
const {dbConn} = require("./configs/dbConn")
const categoryRoute = require('./routes/categoryRoute')
const subCategoryRoute = require('./routes/subCategoryRoute')
const brandRoute = require('./routes/brandRoute')
const productRoute = require("./routes/productRoute")


const ApiError = require('./utils/apiError')

dbConn()
// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
    console.log(`mode : ${process.env.NODE_ENV}`)
}
app.use(express.json())

// Mount Routes
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/subcategories' , subCategoryRoute)
app.use('/api/v1/brands' , brandRoute )
app.use('/api/v1/products' , productRoute)

//
app.all("*",(req,res,next)=>{
    next(new ApiError(500 , `cant't find this route ${req.baseUrl}`))
})
//Global Error Handling Middleware For Express
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Error'
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack : err.stack
    })


})


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})