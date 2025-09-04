const mongoose = require("mongoose");
const { randomBytes, createHmac } = require('crypto');
const {createTokenForUser} = require("../services/authentication")
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt : {type : String},
    resetOTP: String,
    resetOTPExpiry: Date,
    role : {
      type : String,
      enum : ['DONOR', 'ADMIN', 'USER', 'BLOODBANK'],
      default : 'USER'
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")
    this.salt = salt
    this.password = hashedPassword
    next()
})
userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    const user = await this.findOne({email})
    if(!user) return null
    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHashPassword = createHmac("sha256", salt).update(password).digest("hex")

    if(hashedPassword !== userProvidedHashPassword) throw new Error('Incorrect Password') ;
    const token = createTokenForUser(user)
    return token
})
const User = mongoose.model("user", userSchema);
module.exports = User;