const validationMiddleware = (schema)=>{
    return (req,res,next)=>{
        const {error} = schema.validate(req.body)
        if(error){
            console.log(error)
            const err = error.details[0].message
            console.log(err)
             return res.status(403).json({err})
        }
        next()
    }
}
module.exports =  validationMiddleware