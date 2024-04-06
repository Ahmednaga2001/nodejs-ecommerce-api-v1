class ApiFeatures {
    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }
    filter(){
        const queryObj = {...this.queryString}
        const attributes = ['page' , 'limit' , 'sort' , 'fields','keyword']
        attributes.forEach((attribute)=>delete queryObj[attribute])
    
        // Apply filteration using $gte | $gt | $lte | $lt
        //ratingsAverage[lte]=4&price[lt]=50
        let queryStringObj = JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g , (match)=>`$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStringObj))
        return this;
    }
    sort(){
        if(this.queryString.sort){
            //page=1&limit=20&sort=price    assending
            //page=1&limit=20&sort=-price   decending
            //page=1&limit=20&sort=price,sold  two pa
            // -price,sold => ['price' , 'sold']=>price sold
            const sortBy = this.queryString.sort.split(',').join(" ")
            this.mongooseQuery=this.mongooseQuery.sort(sortBy)
        }
        else{
            this.mongooseQuery=this.mongooseQuery.sort('-createAt')
        }
        return this;

    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(" ")
            this.mongooseQuery = this.mongooseQuery.select(fields)
        }
        else{
            this.mongooseQuery=this.mongooseQuery.select('-__v')
        }
        return this;

    }
    search(modelName){
        if(this.queryString.keyword){
         if(modelName === 'Product'){
            this.mongooseQuery=this.mongooseQuery.find({$or:[
                {title : {$regex:this.queryString.keyword , $options:'i'}},
                {description : {$regex:this.queryString.keyword , $options:'i'}}
            ]
            })
         }
         else{
            console.log(modelName)
            this.mongooseQuery=this.mongooseQuery.find({$or:[
                {name : {$regex:this.queryString.keyword , $options:'i'}},
            ]})
         }
       }
       return this;
    }
    paginate(){
        const page = +this.queryString.page || 1
        const limit = +this.queryString.limit || 10
        const skip = (page-1)*limit
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
        return this;
    }
    
}
module.exports = ApiFeatures;