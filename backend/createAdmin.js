import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashed = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin",
    email: "charan@test.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
};

createAdmin();