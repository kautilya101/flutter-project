const fs = require('fs')
const path = require('path');
const CSVToJSON = require("csvtojson");

const getAllData = async() =>{
    try {
        let users = await CSVToJSON().fromFile( path.resolve(__dirname,'../services/output.csv'));
        users = users.filter((user) => user.locations.length < 30 && user.locations.length > 0);
        return users;
      } catch (err) {
        console.log(err);
      }

}


module.exports = {
    getAllData
}