const fs = require('fs');
const path = require('path');
const {v4 : uuidv4} = require('uuid');

const createTask = (task) =>{
    task.id = uuidv4();
    console.log('yup');
    const taskString = fs.readFileSync(path.resolve(__dirname,'../data/tasks.json'),'utf-8');
    let allTasks = JSON.parse(taskString);
    allTasks.push(task);
    fs.writeFileSync( path.resolve(__dirname,'../data/tasks.json'), JSON.stringify(allTasks));
    return task;
}

const getAlltasks = () => {
    // console.log('yes its running');
    return fs.readFileSync(path.resolve(__dirname,'../data/tasks.json'),'utf-8');
}

const updateTasks = (task) => {
    fs.writeFileSync(path.resolve(__dirname,'../data/tasks.json'), JSON.stringify(task));
}

module.exports = {
    createTask,
    getAlltasks,
    updateTasks
}