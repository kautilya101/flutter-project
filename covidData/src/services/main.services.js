const dataRepo = require("../respositories/main.repo")


const getAllData = async () =>{
    const response = await dataRepo.getAllData();
    return response;
}

module.exports = {
    getAllData
}