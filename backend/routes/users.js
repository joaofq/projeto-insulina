const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
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
router.get('/:id', getUserById, getOneUser);

//creating one
router.post('/register', createUser);

//updating one
router.patch('/:id', getUserById, updateUser);

router.delete('/:id', getUserById, deleteUser);

router.post('/login', login);

module.exports = router;
