import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role === "manager" ? "manager" : "user",
      status: "active",
      createdBy: req.user.id,
    });

    res.json({
      msg: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
};


export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};


export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.name = req.body.name || user.name;

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  await user.save();

  res.json({ msg: "Profile updated successfully" });
};



export const updateUser = async (req, res) => {
  const userToUpdate = await User.findById(req.params.id);

  if (!userToUpdate) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (userToUpdate.role === "admin") {
    return res.status(403).json({ msg: "Cannot modify admin" });
  }

  if (req.body.role && ["user", "manager"].includes(req.body.role)) {
    userToUpdate.role = req.body.role;
  }

  await userToUpdate.save();

  res.json({ msg: "User updated successfully" });
};


export const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (userToDelete.role === "admin") {
      return res.status(403).json({ msg: "Cannot delete admin" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user" });
  }
};