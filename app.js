
const express = require("express")
const app = express()
require("dotenv").config()
const connectDB = require("./db/connect")
const products = require("./routes/products")
const notFound = require("./middleware/not-fond")
const errorHandler = require("./middleware/error-handler")

// middleware
app.use(express.json())
app.use("/api/v1/products", products)
app.use(express.static("./public"))
app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 3000 
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`)
        })
    } catch(err){
        console.log(err)
    }
}

start() 