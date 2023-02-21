const path = require('path');

function filePath(fileUrl){
    return path.resolve(__dirname,fileUrl)
}

function filterUser(users){
    return users.filter((user) => user.locations.length <= 50 && user.locations.length > 0)
}

module.exports = {
    filePath,
    filterUser
}