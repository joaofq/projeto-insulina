const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  verifyJWT,
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserById,
} = require('../controllers/users');

//getting all.
router.get('/', getAllUsers);

//getting one
router.get('/me', verifyJWT, getUserById);

//creating one
router.post('/register', createUser);

//ARRUMAR ROTAS UPDATE E DELETE, POIS MUDEI O GETUSERBYID.

//updating one
router.patch('/me', verifyJWT, updateUser);

router.delete('/:id', getUserById, deleteUser);

router.post('/login', login);

module.exports = router;
