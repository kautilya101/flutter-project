const fs = require('fs')
const path = require('path');
const CSVToJSON = require("csvtojson");
const { filterUser, filePath } = require('../utils/util.utils');


async function getAllData(){
    try {
        let users = await CSVToJSON().fromFile(filePath('../services/output.csv') );
        users = filterUser(users);
        // console.log(users[0])
        return users;
      } catch (err) {
        console.log(err);
      }

}


module.exports = {
    getAllData
}