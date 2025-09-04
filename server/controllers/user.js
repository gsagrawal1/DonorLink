const User = require("../models/user");

async function handleSignUp(req, res) {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    const Token = await User.matchPasswordAndGenerateToken(email, password)
    return res.status(200).json({
      token : Token
    });
  } catch {
    return res.status(401).json({
        message : "Invalid email or password"
    })
  }
}
module.exports = {
  handleSignUp,
  handleLogin,
};
