const fs = require('fs');
const {v4 : uuidv4} = require('uuid');

const createTask = (task) =>{
    task.id = uuidv4();
    const taskString = fs.readFileSync('./data/tasks.json');
    let allTasks = JSON.parse(taskString.toString());
    allTasks.push(task);
    fs.writeFileSync('./data/tasks.json', JSON.stringify(allTasks));
}

const getAlltasks = () =>{
    return fs.readFileSync('./data/tasks.json');
}

const updateTasks = (task) => {
    fs.writeFileSync('./data/tasks.json', JSON.stringify(task));
}

module.exports = {
    createTask,getAlltasks,updateTasks
}