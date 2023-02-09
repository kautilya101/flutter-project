
const taskService = require('../services/task.service')

const createTask = async (req, res) =>{
    try{
        const { taskName,taskDesc,dueDate,status } = req.body;
        const task = await taskService.createTask(taskName,taskDesc,dueDate,status);
        res.send("created");
    }
    catch(err){
        res.status(500).send( `Internal error`);
    }
}


const getAlltasks = async (req, res) =>{
    try{
        console.log("enterd");
        let tasks = await taskService.getAlltasks();
        // tasks = JSON.parse(tasks.toString());
        res.send("data fetched");
    }
    catch(err){
        
        res.status(500).send( `Internal error`);
    }
}

const updateTasks = async(req,res) => {
    try{
        
        const { taskName,taskDesc,dueDate,status,id } = req.body;
        let tasks = await taskService.updateTasks(taskName,taskDesc,dueDate,status,id);
        res.status(200).send("Updated data");
    }
    catch(err){
        res.status(500).send(`Updating error`);
    }
}

const deleteTasks = async (req,res) => {
    try{
        const { id } = req.body;
        // console.log(id);
        await taskService.deleteTasks(id);
        res.status(200).send("Deleted");
    }
    catch(err){
        res.status(500).send(`deleting error`);
    }
}

module.exports = {
    createTask,
    getAlltasks,
    updateTasks,
    deleteTasks
}