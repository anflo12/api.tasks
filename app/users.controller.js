const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
//create id 
const shortid = require('shortid')
// encripting password
const bcrypt = require("bcrypt");
const saltRounds = 10;

//encripting password
async function bcryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {}
}
// create user
async function createUser(req, res) {
  let passw = await bcryptPassword(req.body.password);
  req.body.id= shortid.generate()
  req.body.password = passw;

  db.get("users").push(req.body).write();
  res.status(200).send({ message: "user created sucessful" });
}

// get user list
function getUsers(req, res) {
  const users = db.get("users").value();

  return res.status(200).send(users);
}

// search one  user by id
function getUserById(req, res) {
  const user= db.get("users").find({id:req.params.id}).value();
  return res.status(200).send(user);
}
//delete user
function deleteUser(req,res) {
  const user = db.get('users')
  .remove({ id: req.body.id })
  .write()
  
  if (user.length) {
    return res.status(200).send({message:"user successfully removed"});
  }
  return  res.status(200).send({message:"this user has already been removed"});

}

// update user
function updateUser(req,res) {
  const userUpdated =db.get('users')
  .find({ id: req.body.id })
  .assign(req.body)
  .write()
  return res.status(200).send(userUpdated)
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
};
