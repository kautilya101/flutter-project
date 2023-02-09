
const taskRepository = require('../respositories/task.repositories');


const createTask = async (taskName,taskDescription,dueDate,status) => {
    try{
        console.log(taskName,taskDescription,dueDate,status);
     taskRepository.createTask({
        taskName,
        taskDescription,
        dueDate,
        status
     })
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
    console.log(allTasks);
    for(item of allTasks){
        if(item.id === id ){
            item.taskName = taskName;
            item.taskDescription = taskDescription;
            item.dueDate = dueDate;
            item.status = status;
        }
    }
    console.log("i m here");
    taskRepository.updateTasks(allTasks);
    console.log("going well");
}

const deleteTasks = async (id) =>{
    let allTasks = taskRepository.getAlltasks();
    allTasks = JSON.parse(allTasks.toString());
    console.log(allTasks);
    const remainTasks = allTasks.filter(item => item.id != id);
    console.log(remainTasks);
    taskRepository.updateTasks(remainTasks);

}

module.exports = {
    createTask,
    getAlltasks,
    updateTasks,
    deleteTasks
}