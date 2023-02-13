
const taskRepository = require('../respositories/task.repositories');
const { all } = require('../routes/todo.route');


const createTask = async (taskName,taskDescription,dueDate,status) => {
    try{
     const returned = await taskRepository.createTask({
        taskName,
        taskDescription,
        dueDate,
        status
     })
     return returned;
    }
    catch(err){
        console.log(`Error while saving task - ${err}`);
        throw new Error("Internal Server");
    }
}

const getAlltasks = async () =>{
    return  taskRepository.getAlltasks();
}

const updateTasks = async (taskName,taskDescription,dueDate,status,id) =>{
    let allTasks = taskRepository.getAlltasks();
    allTasks = JSON.parse(allTasks.toString());
    for(item of allTasks){
        if(item.id === id ){
            item.taskName = taskName;
            item.taskDescription = taskDescription;
            item.dueDate = dueDate;
            item.status = status;
        }
    }
    taskRepository.updateTasks(allTasks);
    return taskRepository.getAlltasks();
}

const deleteTasks = async (id) =>{
    let allTasks = taskRepository.getAlltasks();
    allTasks = JSON.parse(allTasks);
    const remainTasks = allTasks.filter(item => item.id != id);
    taskRepository.updateTasks(remainTasks);
}

module.exports = {
    createTask,
    getAlltasks,
    updateTasks,
    deleteTasks
}