const userModel = require("../model/user.model");

const getUserHandler = async (req, res) => {
  try {
    console.log("Getting user profile for:", req.user);

    const user = await userModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  } catch (error) {
    console.error("Can't find user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const patchUserHandler = async (req, res) => {
  try {
    const { bio, avatarUrl, sosialLinks } = req.body;

    const user = await userModel
      .findByIdAndUpdate(
        req.user.userId,
        { bio, avatarUrl, sosialLinks },
        { new: true }
      )
      .select("-password");

    res.json({ data: user });
  } catch (error) {
    console.error("Can't update user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.user.userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Can't delete user", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsersHandler = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.json({ data: users });
  } catch (error) {
    console.error("Can't get users", error);
    res.status(500).json({ message: "Server error" });
  }
};

const changeUserRoleHandler = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["admin", "client"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role. Only admin and client are allowed" });
    }

    const existingUser = await userModel.findById(userId).select("-password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.role === "super_admin") {
      return res
        .status(400)
        .json({ message: "Super admin cannot be changed to admin or client" });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, { role, updatedAt: Date.now() }, { new: true })
      .select("-password");

    res.json({
      message: `User ${existingUser.username} role changed to ${role}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Can't change user role", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserHandler,
  patchUserHandler,
  deleteUserHandler,
  getUsersHandler,
  changeUserRoleHandler,
};
