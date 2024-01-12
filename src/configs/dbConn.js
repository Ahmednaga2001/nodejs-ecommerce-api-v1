const mongoose = require("mongoose")
exports.dbConn = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected successfully");
        
    })
    .catch((err) => console.error(`Database Error : ${err}`))
}