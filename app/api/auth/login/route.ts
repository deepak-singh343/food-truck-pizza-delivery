import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
          status: 400,
        })
      );
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          message: "Invalid credentials",
        }),
        { status: 400 }
      );
    }

    // Generate token
    const token = await user.getJWT();

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; Max-Age=604800`,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Server error",
        status: 500,
      }),
      { status: 500 }
    );
  }
};
