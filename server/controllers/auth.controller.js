const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postRegisterHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    console.log(
      `User register ${username}, hashed password: ${hashedPassword}`
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const postLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

const initializeSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await UserModel.findOne({ role: "super_admin" });
    if(!existingSuperAdmin){
      const superAdminData = {
        username: "super_admin",
        password: await bcrypt.hash("SuperAdmin123", 10),
        email: "super_admin@example.com",
        role: "super_admin",
        bio: "I am the super admin",
      }
      const superAdmin = new UserModel(superAdminData);
      await superAdmin.save();
      console.log("Super admin created successfully");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error initializing super admin", error);
  }
}

module.exports = {
  postRegisterHandler,
  postLoginHandler,
  initializeSuperAdmin,
};
