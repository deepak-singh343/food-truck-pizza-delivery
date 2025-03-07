import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);
    await connectToDB();
    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);
    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: "User already exists. Please login",
          status: 400,
        })
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    console.log("user", user);
    await user.save();
    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        status: 200,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "There is some error" + error,
        status: 500,
      })
    );
  }
};
