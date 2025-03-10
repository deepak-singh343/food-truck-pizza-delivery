import bcrypt from "bcryptjs";
import mongoose, { model, models } from "mongoose";
import { SignJWT, jwtVerify } from "jose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

UserSchema.methods.getJWT = async function () {
  const secretKey = process.env.SESSION_SECRET;
  const encodedKey = new TextEncoder().encode(secretKey);
  const user = this;
  return new SignJWT({ id: user._id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

UserSchema.methods.validatePassword = async function (passwordByUser: string) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = bcrypt.compare(passwordByUser, hashedPassword);
  return isPasswordValid;
};

const User = models.User || model("User", UserSchema);

export default User;
