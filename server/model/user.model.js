const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "client", "super_admin"],
    default: "client",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  bio: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },

  sosialLinks: {
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },

  isActive: { type: String, default: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
