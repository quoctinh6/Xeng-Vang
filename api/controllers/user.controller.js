const User = require("../models/user.model");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user by id or legacyId
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = null;
    // try ObjectId first
    try {
      user = await User.findById(id).lean();
    } catch (e) {
      // ignore
    }
    if (!user) user = await User.findOne({ legacyId: id }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, phone, address, role, legacyId } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });
    const exists = await User.findOne({ email }).lean();
    if (exists)
      return res.status(400).json({ error: "Email already registered" });
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      role,
      legacyId,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let user = null;
    try {
      user = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (e) {
      // ignore
    }
    if (!user)
      user = await User.findOneAndUpdate({ legacyId: id }, data, {
        new: true,
        runValidators: true,
      }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let result = null;
    try {
      result = await User.findByIdAndDelete(id);
    } catch (e) {
      // ignore
    }
    if (!result) result = await User.findOneAndDelete({ legacyId: id });
    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
