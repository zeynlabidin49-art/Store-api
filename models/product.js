const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxlength: [20, "max length 20"],
        required: [true, "must provide name"],
    },
    price:{
        type: Number,
        required: [true, "must provide price"],
        min: [0, "price must be a positive number"],
    },
    company:{
        type: String,
        required: [true, "must provide company name"],
        enum: ["ikea", "liddy", "caressa", "marcos"]
    },
    rating:{
        type: Number,
        default: 4.5,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    } 
})

module.exports = mongoose.model("product", productSchema)