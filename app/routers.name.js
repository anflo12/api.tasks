const router = require("./index.routes")

const routes = {
    createUser:"/users",
    getUsers:"/users",
    getUserByid:"/user/:id",
    updateUser:"/updateUser",
    deleteUser:"/deleteUser"
}

module.exports=routes