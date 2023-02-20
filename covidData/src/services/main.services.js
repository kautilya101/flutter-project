const dataRepo = require("../respositories/main.repo")


const getAllData = () =>{
    return dataRepo.getAllData();
}

module.exports = {
    getAllData
}