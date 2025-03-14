import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }
    const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    await connectToDB();
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "User found", data: user }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof JWTExpired) {
      return new Response(JSON.stringify({ message: "Token expired" }), {
        status: 401,
      });
    }
    return new Response(
      JSON.stringify({ message: "Internal server error" + error }),
      {
        status: 500,
      }
    );
  }
};
