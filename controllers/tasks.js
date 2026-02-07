const asyncWraper = require("../middleware/async")
const Task = require("../models/task")
const {customApiError, createCustomError} = require("../errors/custom-error")

const getAllTasks = asyncWraper(async(req, res) => {
        const tasks = await Task.find({})
        res.json({tasks})
})

const createTask = asyncWraper( async (req, res) => {
        const task = await Task.create(req.body)
        res.json(task)
})

const getTask = asyncWraper(async(req, res, next) => {
        const {id} = req.params
        const task = await Task.findOne({_id:id})
        if (!task) {
                return next(createCustomError("bbbbbbbbbb Ther are no task with this id: "+ id, 404))
        }
        res.json({task})  
})

const deleteTask = asyncWraper(async(req, res) => {
        const {id} = req.params
        const task = await Task.deleteOne({_id: id})
        if (!task) return next(createCustomError("bbbbbbbbbb Ther are no task with this id: "+ id, 404))
        res.json({task})
})

const updateTask = asyncWraper(async(req, res, next) => {
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
                    new: true,
                    runValidators: true,
                })
        if(!task){
               return next(createCustomError("bbbbbbbbbb Ther are no task with this id: "+ taskId, 404))
        } 
                
        res.status(201).json({task})
})

const editeTask = asyncWraper(async(req, res) => {
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
                    new: true,
                    runValidators: true,
                    overwrite: true
                })
        if(!task) next(createCustomError("bbbbbbbbbb Ther are no task with this id: "+ id, 404))
        res.status(201).json({task})
})

module.exports = {
    getAllTasks,
    createTask, 
    getTask,
    updateTask,
    deleteTask,
    editeTask
}