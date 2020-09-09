const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} = require("./users.controller");

//names routers 
const names = require('./routers.name')

router.get("/", (req, res) => {
  res.status(200).send("Hola, Bienvenidos");
});

router.post(names.createUser, createUser);
router.post(names.deleteUser, deleteUser);
router.post(names.updateUser, updateUser);
router.get(names.getUsers, getUsers);
router.get(names.getUserByid, getUserById);

module.exports = router;
