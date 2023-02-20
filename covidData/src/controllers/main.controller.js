
const dataService = require('../services/main.services')
const getAllData = async(req,res) => {
    try{
        const data = await dataService.getAllData();
        res.send(data);
    }
    catch(err){
        console.log(`Error in controller - ${err}`)
    }
}

module.exports = {
    getAllData
}