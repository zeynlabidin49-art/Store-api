const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxlength: [20, "max length 20"],
        required: [true, "must provide name"],
    },
    completed:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("task", taskSchema)