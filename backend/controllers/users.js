const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req, res, next) => {
  const token = req.headers['authorization']
    ? req.headers['authorization'].replace('Bearer ', '')
    : null;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports.getUserById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.userId);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json(user);
};

//SEM VerifyJWT:
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports.getOneUser = (req, res) => {
//   res.json(res.user);
// };

module.exports.createUser = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    name: req.body.name,
    idade: req.body.idade,
    email: req.body.email,
    password: hashedPassword,
    incremento: req.body.incremento,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.idade != null) {
    res.user.idade = req.body.idade;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    res.user.password = hashedPassword;
  }
  if (req.body.incremento != null) {
    res.user.incremento = req.body.incremento;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  //ESTAMOS PASSANDO O USER DIRETO NO LOGIN. VAMOS TIRAR POSTERIORMENTE.
  //  res.json({ token: token, user });

  res.json({ token: token });
};
