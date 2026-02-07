const express = require("express")
const router = express.Router()
const {getAllTasks,createTask,getTask,updateTask,deleteTask,editeTask} = require("../controllers/tasks")

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask).put(editeTask)

module.exports = router